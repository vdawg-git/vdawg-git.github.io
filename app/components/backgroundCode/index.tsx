"use client"
import { useEffect } from "react"
import { initialzeCodeBackground } from "./backgroundCodeHelper"

export function BackgroundCode() {
	useEffect(() => {
		const unsubscribeBackground = initialzeCodeBackground()

		return () => {
			unsubscribeBackground()
		}
	})

	return (
		<div className="contain-[style_size_layout] -z-30 absolute inset-0 pointer-events-none">
			<div className="contain-[style_layout_size] absolute -mt-16  duration-16   inset-0 -z-50 mx-auto max-w-[1320px] text-xs opacity-[10%]">
				<pre>
					<code
						id="bg-code"
						className="overflow-hidden text-[11px] transition-opacity opacity-100 starting:opacity-0 duration-3000 absolute top-24 [text-shadow:0_0_8px_currentColor] left-0"
					></code>
				</pre>
			</div>
		</div>
	)
}
