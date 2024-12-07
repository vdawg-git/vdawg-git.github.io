import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import { baseUrl } from "app/sitemap"
import { formatDate } from "app/lib/helper"
import { getProjects } from "../utils"

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
			url: `${baseUrl}/blog/${project.slug}`,
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

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: project.metadata.title,
						datePublished: project.metadata.publishedAt,
						dateModified: project.metadata.publishedAt,
						description: project.metadata.summary,
						image: project.metadata.image
							? `${baseUrl}${project.metadata.image}`
							: `/og?title=${encodeURIComponent(project.metadata.title)}`,
						url: `${baseUrl}/projects/${project.slug}`,
						author: {
							"@type": "VDawg",
							name: "Portfolio",
						},
					}),
				}}
			/>
			<h1 className="title font-semibold text-2xl tracking-tighter">
				{project.metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(project.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose">
				<CustomMDX source={project.content} />
			</article>
		</section>
	)
}
