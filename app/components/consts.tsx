import { InstagramIcon } from "./icons/instagram.tsx"
import type { ReactNode } from "react"
import { cn } from "app/lib/helper.ts"

export const linksMap = {
	instagram: {
		label: "Instagram",
		link: "https://www.instagram.com/vdawg.jpg/",
		Icon: ({ className }) => (
			<InstagramIcon className={cn("size-6", className)} />
		),
	},
	github: {
		label: "Github",
		link: "https://github.com/vdawg-git",
		Icon: ({ className }) => (
			<div className={cn(`i-pixelarticons-github size-6`, className)} />
		),
	},
} as const satisfies Record<
	string,
	{
		label: string
		link: string
		Icon: (props: { className?: string }) => ReactNode
	}
>

export const links = Object.values(linksMap)
