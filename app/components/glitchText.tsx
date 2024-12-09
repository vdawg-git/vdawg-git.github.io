"use client"

import type React from "react"
import { use, useEffect, useState } from "react"
import { delayWhen, interval, map, merge, of, take, takeUntil } from "rxjs"

const chars =
	"abcdefghijklmnopqrstuvwxyz123456789 ぁあざじすせそぞたどにねのほまみめもゃやゆよらりるゐをんゔゕゖサザシジゼソタチッ"
		.split("")
		.flatMap((char) => {
			const uppercase = char.toUpperCase()
			return char === uppercase ? char : [char, char.toUpperCase()]
		})

export function GlitchText(props: {
	children: string
	as: React.ElementType<
		any,
		"a" | "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	>
	className: string
	speed?: number
}) {
	const { children: text, className, speed = 35 } = props
	const Tag = props.as

	const initialText = text.replaceAll(/[^\s]/g, " ")
	const [toRender, setToRenderText] = useState(initialText)

	useEffect(() => {
		const toRender$ = merge(
			of(0),
			interval(speed * 0.8).pipe(
				map((i) => i + 1),
				delayWhen(() => interval(speed * Math.random()))
			)
		).pipe(
			take(text.length + 1),
			map((index) => {
				const typed = text.slice(0, index + 1)
				const toType =
					index >= text.length - 1
						? ""
						: "|" + text.slice(index + 1).replaceAll(/[^\s]/g, " ")
				return typed + toType
			})
		)

		const subscription = toRender$.subscribe((toRenderText) => {
			setToRenderText(toRenderText)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return (
		<Tag className={className} aria-label={text}>
			<pre aria-hidden>{toRender}</pre>
		</Tag>
	)
}
