"use client"

import { cn } from "app/lib/helper"
import { observeIntersection } from "app/lib/observables"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
	delay,
	delayWhen,
	filter,
	interval,
	map,
	merge,
	of,
	switchMap,
	take,
	takeUntil,
} from "rxjs"

const chars =
	"abcdefghijklmnopqrstuvwxyz123456789 ЖҏфΞδΘ@&:;…!¡?¿·•*⁊‧#/♠♣♥◊♦↵↗╦↕ЏΩ⌘{}[]/«»‹›"
		.split("")
		.flatMap((char) => {
			const uppercase = char.toUpperCase()
			return char === uppercase ? char : [char, char.toUpperCase()]
		})

/** How many times to repeat the glitch effect for each character */
const subIterations = 3
const glitchedForward = 4
const defaultSpeed = 30

export function GlitchText(props: {
	children: string
	as: React.ElementType<
		any,
		"a" | "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	>
	className?: string
	speed?: number
	startDelay?: number
	style?: React.CSSProperties
}) {
	const { children: text, className, style, speed = defaultSpeed } = props
	const Tag = props.as

	const initialText = toEmptyPlaceholder(text)
	const [toRender, setToRenderText] = useState(initialText)
	const totalIterations = text.length * subIterations + 1
	const element = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!element.current) {
			console.warn("No element found ghoghg")
			return
		}

		const start$ = observeIntersection(element.current, {
			threshold: 0.05,
			rootMargin: "0px -200px 0px -200px",
		}).pipe(
			filter((entries) => entries.some((entry) => entry.isIntersecting)),
			delay(props.startDelay ?? 0),
			take(1)
		)

		const toRender$ = start$.pipe(
			switchMap(() =>
				merge(
					of(0),
					// reduce the speed a bit and add some random delay
					interval((speed * 0.8) / subIterations).pipe(
						map((i) => i + 1),
						delayWhen(() => interval(speed * Math.random()))
					)
				).pipe(
					take(totalIterations),
					map((index) => index / subIterations),
					map((iteration) => {
						if (iteration >= text.length) {
							return text
						}
						const index = Math.ceil(iteration)

						const typed = text.slice(0, index)

						const glitched = text
							.slice(index, index + glitchedForward + 1)
							.split("")
							.map((char, charIndex) =>
								char.match(/\s/) ? char : charIndex === 0 ? "|" : randomChar()
							)
							.join("")

						const emptyPlaceholder = toEmptyPlaceholder(
							text.slice(index + 1 + glitchedForward)
						)

						return typed + glitched + emptyPlaceholder
					})
				)
			)
		)

		const subscription = toRender$.subscribe((toRenderText) => {
			setToRenderText(toRenderText)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return (
		<Tag
			className={cn("whitespace-pre-line", className)}
			aria-label={text}
			style={style}
			ref={element}
		>
			{toRender}
		</Tag>
	)
}

function toEmptyPlaceholder(text: string) {
	// @ts-ignore
	return text.replaceAll(/[^\s]/g, " ")
}

function randomChar() {
	return chars[Math.floor(Math.random() * chars.length)]
}
