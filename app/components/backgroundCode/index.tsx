"use client"
import { useEffect } from "react"
import { initializeCodeBackground } from "./backgroundCodeHelper"

export function BackgroundCode() {
	useEffect(() => {
		const unsubscribeBackground = initializeCodeBackground()

		return () => {
			unsubscribeBackground()
		}
	}, [])

	return (
		<div className="contain-[style_size_layout_paint] max-w-screen overflow-hidden -z-30 absolute inset-0 pointer-events-none">
			<div className="contain-[style_layout_size] absolute -mt-28  duration-16   inset-0 -z-50 mx-auto max-w-[1320px] text-xs opacity-[15%]">
				<pre>
					<code
						id="bg-code"
						className="overflow-hidden text-[11px]  opacity-0 data-rendered:opacity-40 md:data-rendered:opacity-100 transition-opacity duration-1200 delay-250     absolute top-24 [text-shadow:0_0_8px_currentColor] left-0 "
					></code>
				</pre>
			</div>
		</div>
	)
}
