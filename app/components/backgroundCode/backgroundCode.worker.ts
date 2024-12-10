import { highlight } from "sugar-high"
import { diffLines, type Change } from "diff"
import prettier from "prettier"
import parserHtml from "prettier/plugins/html"

import type { BackgroundCodeArgument } from "./types"
import {
	auditTime,
	debounce,
	debounceTime,
	delay,
	map,
	merge,
	pairwise,
	skip,
	Subject,
	switchMap,
	take,
} from "rxjs"

const colors = {
	green: "rgb(0, 255, 200, 0.25)",
	red: "rgba(229,83,75,0.25)",
}
const longStringsRegex = /(?<==")([^"]{20,})(?=")/gm
const noContentTagsRegex = /(<(\w*)[^>]*)><\/\2>/gm
const scriptTagRegex = /<script.*>.*<\/script>/gm

const message$ = new Subject<BackgroundCodeArgument>()
self.onmessage = (event: MessageEvent<BackgroundCodeArgument>) => {
	console.log(event.data)
	message$.next(event.data)
}

const highlighted$ = message$.pipe(
	auditTime(50),
	map((data) => cleanupHtml(data.htmlString)),
	switchMap(formatHTML),
	map(highlight)
)

const diffed$ = highlighted$.pipe(
	pairwise(),
	map(([previous, current]) =>
		diffLines(previous, current).map(diffPartToHTML).join("")
	)
)

merge(
	// we delay the highlighted to first show the diff and then the normal code
	highlighted$.pipe(debounceTime(820)),
	diffed$
).subscribe((response) => {
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
		plugins: [parserHtml],
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
