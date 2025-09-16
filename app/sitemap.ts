import { getProjects } from "./projects/utils"

export const baseUrl = "https://vdawg.me"
export const dynamic = "force-static"

export default async function sitemap() {
	// let blogs = getBlogPosts().map((post) => ({
	//   url: `${baseUrl}/blog/${post.slug}`,
	//   lastModified: post.metadata.publishedAt,
	// }))
	const projects = getProjects().map((project) => ({
		url: `${baseUrl}/projects/${project.slug}`,
	}))

	let routes = [""].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}))

	return [...routes, ...projects]
}
