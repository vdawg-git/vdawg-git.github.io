import { getBlogPosts } from "app/blog/utils"
import { getProjects } from "./projects/utils"

export const baseUrl = "https://vdawg.me"

export default async function sitemap() {
	// let blogs = getBlogPosts().map((post) => ({
	//   url: `${baseUrl}/blog/${post.slug}`,
	//   lastModified: post.metadata.publishedAt,
	// }))
	const projects = getProjects().map((project) => ({
		url: `${baseUrl}/projects/${project.slug}`,
		lastModified: project.metadata.publishedAt,
	}))

	let routes = [""].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}))

	return [...routes, ...projects]
}
