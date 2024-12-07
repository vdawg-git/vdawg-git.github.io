import { getMDXData } from "app/lib/markdown"
import path from "path"

export function getBlogPosts() {
	return getMDXData(path.join(process.cwd(), "app", "blog", "posts"))
}
