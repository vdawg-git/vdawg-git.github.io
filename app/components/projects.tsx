import Link from "next/link"
import Image from "next/image"

import { getProjects } from "app/projects/utils"
import clsx from "clsx"
import type { MarkdownData } from "app/lib/markdown"
import type React from "react"
import type { CSSProperties } from "react"
import { Button } from "./button"

export function Projects() {
	const projects = getProjects()

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 ">
			{projects
				.sort((a, b) => {
					if (Number(a.metadata.sort) > Number(b.metadata.sort)) {
						return -1
					}
					return 1
				})
				.map((data, index) => smallItem(data, index))}
		</div>
	)
}

function smallItem({ metadata, slug }: MarkdownData, index: number) {
	return (
		<div
			className={clsx(
				"w-full flex group   outline-gray0 flex-col [outline-style:groove]  [outline-width:8px] -outline-offset-4   gap-2 items-start  space-x-0 md:space-x-2"
			)}
			style={{ zIndex: index }}
			key={slug}
		>
			{metadata.image && (
				<Link
					key={slug}
					className="shrink-0 grow-0   flex items-center justify-center   space-y-1 self-center "
					href={`/projects/${slug}`}
				>
					<Image
						src={metadata.image}
						alt={metadata.title}
						width={240}
						height={240}
						style={{} as CSSProperties}
						className={`sepia-40 brightness-75 group-hover:brightness-100
							 [--tw-hue-rotate:url(#pixelate)] 
							 p-2 max-h-[240px]   group-hover:hue-rotate-0     object-cover min-h-[240px]   group-hover:sepia-0 `}
					/>
				</Link>
			)}
			<div className="flex flex-col justify-between grow items-start p-6">
				<div>
					<Link
						href={`/projects/${slug}`}
						className="text-neutral-900 hover:underline group-hover:text-[var(--c)] text-lg dark:text-neutral-100 tracking-tight"
						style={
							{ "--c": `var(--color-${metadata.color})` } as React.CSSProperties
						}
					>
						{metadata.title}
					</Link>
					<p className="text-gray1">{metadata.summary}</p>
				</div>

				<Button
					className="justify-self-end mt-4"
					as="a"
					href={`/projects/${slug}`}
				>
					Check out
				</Button>
			</div>
		</div>
	)
}
