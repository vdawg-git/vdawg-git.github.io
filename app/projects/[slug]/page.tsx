import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import Image from "next/image"
import { baseUrl } from "app/sitemap"
import { getProjects } from "../utils"
import { GlitchText } from "app/components/glitchText"
import { Button } from "app/components/button"

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
		<section className="max-w-2xl mx-auto px-6 ">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: metadata.title,
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

			<div className="flex  flex-col-reverse md:flex-row  items-start   justify-start mt-4 lg:mt-12 md:gap-8 gap-4 md:justify-between">
				<div className="">
					<GlitchText
						as="h1"
						className="title font-semibold text-xl tracking-tighter"
						style={{ color: `var(--color-${metadata.color})` }}
					>
						{metadata.title}
					</GlitchText>
					<GlitchText
						as="p"
						startDelay={200}
						className="text-sm text-neutral-600 dark:text-neutral-400"
					>
						{metadata.summary}
					</GlitchText>
				</div>

				{metadata.image && (
					<Image
						src={metadata.image}
						alt={`${metadata.title}`}
						width={200}
						height={200}
						priority
						className="border-8 border-double border-bg2  grow-0 shrink-0 sm:w-[200px] w-[160px] aspect-square object-cover"
					/>
				)}
			</div>

			<article className="prose mt-6 md:mt-12">
				<CustomMDX
					source={content}
					components={{
						a: (text) => <Button as="a" {...text} color="yellow" />,
					}}
				/>
			</article>
		</section>
	)
}
