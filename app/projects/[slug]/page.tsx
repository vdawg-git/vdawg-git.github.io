import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import { baseUrl } from "app/sitemap"
import { getProjects } from "../utils"
import { GlitchText } from "app/components/glitchText"
import { Button } from "app/components/button"
import { TechStack } from "app/components/techStack"
import { CreatedLogos } from "./CreatedLogos"
import Link from "next/link"

export type Parameter = {
	slug: string
}

export async function generateStaticParams(): Promise<Parameter[]> {
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
	} = project.metadata

	return {
		title,
		description,
		openGraph: {
			title: `Project: ${title}`,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/projects/${project.slug}`,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
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
		<section className="max-w-2xl mx-auto  ">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: `Project: ${metadata.title}`,
						description: metadata.summary,
						url: `${baseUrl}/projects/${slug}`,
						author: {
							"@type": "VDawg",
							name: "Portfolio",
						},
					}),
				}}
			/>

			<div className="flex  flex-col-reverse md:flex-row  items-start md:items-center   justify-start  mt-4 lg:mt-12 md:gap-8 gap-4 md:justify-between md:border-4 border-bg3 border-double md:p-4 md:[box-shadow:var(--color-bg1)_16px_16px] ">
				<div className="">
					<GlitchText
						as="h1"
						className="title font-semibold sm:text-xl text-lg tracking-tighter"
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

					{metadata.link && (
						<Button className="text-orange mt-4">
							<Link
								href={metadata.link}
								target="_blank"
								className="text-orange"
							>
								Take a look
							</Link>
						</Button>
					)}
				</div>

				{metadata.image && (
					<img
						src={metadata.image}
						alt={`${metadata.title}`}
						width={200}
						height={200}
						loading="eager"
						className="grow-0 shrink-0 sm:w-[200px] w-[160px] aspect-square object-contain opacity-55"
					/>
				)}
			</div>

			<article className="prose mt-6 md:mt-12">
				<CustomMDX
					source={content}
					components={{
						a: (text) => <Button as="a" {...text} color="yellow" />,
						TechStack,
						CreatedLogos,
					}}
				/>
			</article>
		</section>
	)
}
