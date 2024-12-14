import Link from "next/link"
import Image from "next/image"
import "./projects.css"

import { getProjects } from "app/projects/utils"
import clsx from "clsx"
import type { MarkdownData } from "app/lib/markdown"
import type React from "react"
import type { CSSProperties } from "react"
import { Button } from "./button"
import { cn } from "app/lib/helper"

export function Projects() {
	const projects = getProjects()

	return (
		<div className="relative">
			<div className="sm:grid flex flex-col  grid-cols-1   sm:grid-cols-2 lg:grid-cols-6 projects">
				{projects
					.sort((a, b) => {
						if (Number(a.metadata.sort) > Number(b.metadata.sort)) {
							return -1
						}
						return 1
					})
					.map((data, index) => smallItem(data, index))}
			</div>

			<div className="absolute contain-[layout_size_style]  -right-1/2 z-10 bottom-24 bg-radial mix-blend-color-dodge from-fg/50 to-transparent to-60% w-[150%] h-full   pointer-events-none" />
		</div>
	)
}

function smallItem({ metadata, slug }: MarkdownData, index: number) {
	return (
		<div
			className={cn(
				"flex group   outline-dimYellow flex-col [outline-style:double] leading-[1.1]   [outline-width:4px] -outline-offset-2   gap-2 items-start  ",
				"col-span-2"
				// (index === 0 || index === 1) && "col-span-3"
			)}
			style={{ zIndex: index }}
			key={slug}
		>
			{metadata.image && (
				<Link
					key={slug}
					className="shrink-0 grow-0   flex items-center justify-center   space-y-1 sm:self-center "
					href={`/projects/${slug}`}
				>
					<img
						src={metadata.image}
						alt={metadata.title}
						width={144}
						height={144}
						style={{} as CSSProperties}
						className={clsx(
							`img-filter     p-2 max-h-[144px]        object-cover min-h-[144px]    `,
							!metadata.pixelate && "md:[--pixelate:url(#pixelate)]"
						)}
					/>
				</Link>
			)}
			<div className="flex flex-col justify-between grow items-start p-2 sm:p-[1ch]">
				<div>
					<Link
						href={`/projects/${slug}`}
						className="hover:underline text-base  text-fg        tracking-tight"
						style={
							{ "--c": `var(--color-${metadata.color})` } as React.CSSProperties
						}
					>
						{metadata.title}
					</Link>
					<p className="text-dimYellow">{metadata.summary}</p>
				</div>

				<Button
					className="justify-self-end mt-4"
					as="a"
					color="yellow"
					href={`/projects/${slug}`}
				>
					Check out
				</Button>
			</div>
		</div>
	)
}
