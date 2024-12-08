import { highlight } from "sugar-high"
import { diffLines, type Change } from "diff"
import prettier from "prettier"

import type { BackgroundCodeArgument } from "./types"
import {
	auditTime,
	delay,
	map,
	merge,
	pairwise,
	Subject,
	switchMap,
} from "rxjs"

const colors = {
	green: "rgb(0, 255, 200, 0.25)",
	red: "rgba(229,83,75,0.25)",
}
const longStringsRegex = /(?<==")([^"]{20,})(?=")/gm
const noContentTagsRegex = /(<(\w*)[^>]*)><\/\2>/gm

const message$ = new Subject<MessageEvent<BackgroundCodeArgument>>()
onmessage = (message) => message$.next(message)

const highlighted$ = message$.pipe(
	auditTime(50),
	map((event) => cleanupHtml(event.data.htmlString)),
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
	highlighted$.pipe(delay(850)),
	diffed$
).subscribe(postMessage)

function cleanupHtml(html: string) {
	return html
		.replace(longStringsRegex, "◦◦◦") // class="..long string.." => class="◦◦◦"
		.replace(noContentTagsRegex, "$1/>") // <div></div> => <div/>
}

function formatHTML(html: string) {
	return prettier.format(html, {
		parser: "html",
		printWidth: 120,
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
