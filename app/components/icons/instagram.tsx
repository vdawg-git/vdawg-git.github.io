import type { SVGProps } from "react"

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M6 2H18V4H6V2Z" fill="currentColor" />
			<path d="M6 20V22H18V20H16H8H6Z" fill="currentColor" />
			<path d="M4 18V20H6V18H4Z" fill="currentColor" />
			<path d="M4 6H2V18H4V16V6Z" fill="currentColor" />
			<path d="M20 18H22V6H20V18Z" fill="currentColor" />
			<path d="M18 20H20V18H18V20Z" fill="currentColor" />
			<path d="M20 6V4H18V6H20Z" fill="currentColor" />
			<path d="M6 6V4H4V6H6Z" fill="currentColor" />
			<rect x="8" y="10" width="2" height="4" fill="currentColor" />
			<rect
				x="10"
				y="16"
				width="2"
				height="4"
				transform="rotate(-90 10 16)"
				fill="currentColor"
			/>
			<rect
				x="10"
				y="10"
				width="2"
				height="4"
				transform="rotate(-90 10 10)"
				fill="currentColor"
			/>
			<rect x="14" y="10" width="2" height="4" fill="currentColor" />
			<rect x="14" y="10" width="2" height="4" fill="currentColor" />
			<rect x="15" y="6" width="2" height="2" fill="currentColor" />
		</svg>
	)
}
