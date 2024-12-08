import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import Image from "next/image"
import { baseUrl } from "app/sitemap"
import { formatDate } from "app/lib/helper"
import { getProjects } from "../utils"
import type { CSSProperties } from "react"

type Parameter = {
	slug: string
}
type Params = readonly Parameter[]

export async function generateStaticParams(): Promise<Params> {
	const projects = getProjects()

	return projects.map(({ slug }) => ({
		slug,
	}))
}

export async function generateMetadata(props: { params: Promise<Parameter> }) {
	const params = await props.params
	const project = getProjects().find((post) => post.slug === params.slug)
	if (!project) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = project.metadata
	const ogImage = image
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/projects/${project.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	}
}

export default async function Project(props: { params: Promise<Parameter> }) {
	const params = await props.params

	const project = getProjects().find((post) => post.slug === params.slug)

	if (!project) {
		notFound()
	}
	const { metadata, slug, content } = project

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: metadata.title,
						datePublished: metadata.publishedAt,
						dateModified: metadata.publishedAt,
						description: metadata.summary,
						image: metadata.image
							? `${baseUrl}${metadata.image}`
							: `/og?title=${encodeURIComponent(metadata.title)}`,
						url: `${baseUrl}/projects/${slug}`,
						author: {
							"@type": "VDawg",
							name: "Portfolio",
						},
					}),
				}}
			/>

			<div
				className="bg-[var(--c,--color-bg1)] items-center grid grid-rows-1 grid-cols-3 h-[400px] aspect-video relative"
				style={{ "--c": `var(--color-${metadata.color})` } as CSSProperties}
			>
				{metadata.image && (
					<Image
						src={metadata.image}
						alt={`${metadata.title}`}
						width={200}
						height={200}
						priority
						className="col-end-3 col-start-2 z-20"
					/>
				)}
				{metadata.banner && (
					<Image
						src={metadata.banner}
						alt={`${metadata.title} banner`}
						width={(400 / 9) * 16}
						height={400}
						priority
						className="col-span-full "
					/>
				)}
			</div>
			<h1
				className="title font-semibold text-2xl tracking-tighter"
				style={{ color: `var(--color-${metadata.color})` }}
			>
				{metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{metadata.summary}
				</p>
			</div>
			<article className="prose">
				<CustomMDX source={content} />
			</article>
		</section>
	)
}
