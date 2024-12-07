import { Projects } from "app/components/projects"

export default function Page() {
	return (
		<section>
			<hgroup className="mb-8 ">
				<h1 className="text-gray2">
					Christofer Koeth <span className="text-gray0 italic">aka VDawg</span>
				</h1>
				<h2>Front-End Developer</h2>
				<h2>Webdesigner</h2>
			</hgroup>
			<p className="mb-4 text-gray2">
				{`Front-end developer. I like code, design and art. Always looking for new challenges.`}
			</p>
			<div className="my-8">
				<Projects />
			</div>
		</section>
	)
}
