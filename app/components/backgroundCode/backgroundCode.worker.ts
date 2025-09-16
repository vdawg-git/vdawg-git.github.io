import { highlight } from "sugar-high"
import { diffLines, type Change } from "diff"
import prettier from "prettier"
import prettierHtml from "prettier/plugins/html"

import {
	auditTime,
	combineLatest,
	delay,
	distinctUntilChanged,
	map,
	of,
	startWith,
	Subject,
	switchMap,
} from "rxjs"

const colors = {
	green: "rgb(137, 180, 130, 0.25)",
	red: "rgb(234, 105, 98, 0.25)",
}
const longStringsRegex = /(?<==")([^"]{20,})(?=")/gm
const noContentTagsRegex = /(<(\w*)[^>]*)><\/\2>/gm
const scriptTagRegex = /<script.*>.*<\/script>/gm

const message$ = new Subject<string>()
self.onmessage = (event: MessageEvent<string>) => {
	message$.next(event.data)
}

const highlighted$ = message$.pipe(
	map(cleanupHtml),
	switchMap(formatHTML),
	map((html) => highlight(html))
)

combineLatest([
	highlighted$.pipe(auditTime(1100), startWith(undefined)),
	highlighted$,
])
	.pipe(
		// Show diffs with the non-updated previous state for 200ms
		switchMap(([debounced, current], index) => {
			if (debounced === undefined || debounced === current) {
				return of(current).pipe(delay(index === 0 ? 0 : 1200))
			}

			return of(diffLines(debounced, current).map(diffPartToHTML).join(""))
		}),
		distinctUntilChanged()
	)
	.subscribe((response) => {
		self.postMessage(response)
	})

function cleanupHtml(html: string) {
	return html
		.replace(longStringsRegex, "◦◦◦") // class="..long string.." => class="◦◦◦"
		.replace(noContentTagsRegex, "$1/>") // <div></div> => <div/>
		.replace(scriptTagRegex, "")
}

function formatHTML(html: string) {
	return prettier.format(html, {
		parser: "html",
		printWidth: 120,
		plugins: [prettierHtml],
	})
}

function diffPartToHTML(part: Change) {
	const color = part.added
		? colors.green
		: part.removed
			? colors.red
			: undefined

	return color
		? `<span style="background-color: ${color};">${part.value}</span>`
		: part.value
}
