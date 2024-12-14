import type { MarkdownData } from "app/lib/markdown"
import { getProjects } from "app/projects/utils"
import type { Params } from "next/dist/server/request/params"
import { ImageResponse } from "next/og"
import {
	NextResponse,
	type ImageResponseOptions,
	type NextRequest,
} from "next/server"
import fs from "node:fs"
import path from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const dynamic = "force-static"

const projects = getProjects()
const fontData = fs.readFileSync(
	path.join(__dirname, "../../public/DepartureMono-Regular.otf")
)
const ogOptions: ImageResponseOptions = {
	fonts: [
		{
			name: "Departure Mono",
			data: fontData,
			weight: 400,
			style: "normal",
		},
	],
	width: 1200,
	height: 630,
}

export async function generateStaticParams() {
	return getProjects().map(({ slug }) => ({ slug: `${slug}.png` }))
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const props = await params
	const data = projects.find(({ slug }) => slug === props.slug)
	if (!data) {
		throw new Error(`Project with slug ${props.slug} not found. hoj`)
	}
	const { metadata } = data

	return new ImageResponse(
		(
			<div
				tw="flex flex-col w-full h-full items-center justify-center bg-white"
				style={{ fontFamily: "Departure Mono" }}
			>
				<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
					<h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
						{metadata.title}
					</h2>

					{metadata.summary && <p>{metadata.summary}</p>}
				</div>
			</div>
		),
		ogOptions
	)
}
