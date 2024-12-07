import Link from "next/link"
import Image from "next/image"

import { getProjects } from "app/projects/utils"

export function Projects() {
	const projects = getProjects()

	return (
		<div className="flex gap-6 flex-wrap  ">
			{projects
				.sort((a, b) => {
					if (Number(a.metadata.sort) > Number(b.metadata.sort)) {
						return -1
					}
					return 1
				})
				.map(({ metadata, slug }) => (
					<div
						className="w-full flex group  gap-4 items-center md:flex-row space-x-0 md:space-x-2"
						key={slug}
					>
						{metadata.image && (
							<Link
								key={slug}
								className="flex flex-col size-[240px] shrink-0 grow-0  space-y-1 mb-4"
								href={`/projects/${slug}`}
							>
								<Image
									src={metadata.image}
									alt={metadata.title}
									width={240}
									height={240}
									className={`sepia-80  object-cover min-h-[240px]   group-hover:sepia-0 transition-all`}
									style={{ backgroundColor: `var(--color-${metadata.color})` }}
								/>
							</Link>
						)}
						<div className="flex flex-col">
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
								{metadata.title}
							</p>
							<p className="text-gray1">{metadata.summary}</p>
						</div>
					</div>
				))}
		</div>
	)
}
