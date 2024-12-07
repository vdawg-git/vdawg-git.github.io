import { getMDXData } from "app/lib/markdown"
import path from "path"

export function getProjects() {
	return getMDXData(path.join(process.cwd(), "app", "projects", "pages"))
}
