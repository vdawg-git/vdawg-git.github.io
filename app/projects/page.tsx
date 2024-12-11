import { Projects } from "app/components/projects"

export const metadata = {
	title: "Projects",
	description: "Some stuff I created",
}

export default function Page() {
	return (
		<section className="max-w-5xl mx-auto md:mt-12">
			<h1 className="font-semibold text-xl mb-8 tracking-tighter">Projects</h1>
			<Projects />
		</section>
	)
}
