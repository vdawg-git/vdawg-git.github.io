import fs from "node:fs"
import path from "node:path"

type Metadata = {
	title: string
	publishedAt: string
	summary: string
	image?: string
	sort?: number
	color?: string
	banner?: string
	pixelate?: boolean
}

export type MarkdownData = {
	metadata: Metadata
	slug: string
	content: string
}

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)
	const frontMatterBlock = match![1]
	const content = fileContent.replace(frontmatterRegex, "").trim()
	const frontMatterLines = frontMatterBlock.trim().split("\n")
	const metadata: Partial<Metadata> = frontMatterLines.reduce(
		(accumulator, line) => {
			const [key, ...valueArr] = line.split(": ")
			const value = valueArr
				.join(": ")
				.trim()
				.replace(/^['"](.*)['"]$/, "$1") // Remove quotes
			// @ts-ignore wut
			accumulator[key.trim() as keyof Metadata] = value
			return accumulator
		},
		{} as Partial<Metadata>
	)

	return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf-8")
	return parseFrontmatter(rawContent)
}

export function getMDXData(dir: string): MarkdownData[] {
	return getMDXFiles(dir).map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file))
		const slug = path.basename(file, path.extname(file))

		return {
			metadata,
			slug,
			content,
		}
	})
}
