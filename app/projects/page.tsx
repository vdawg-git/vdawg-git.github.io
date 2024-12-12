import { GlitchText } from "app/components/glitchText"
import { Projects } from "app/components/projects"

export const metadata = {
	title: "Projects",
	description: "Some stuff I created",
}

export default function Page() {
	return (
		<section className="max-w-3xl mx-auto md:mt-12">
			<GlitchText
				as="h1"
				className="font-semibold text-lg sm:text-xl mb-8 tracking-tighter"
			>
				Projects
			</GlitchText>
			<Projects />
		</section>
	)
}
