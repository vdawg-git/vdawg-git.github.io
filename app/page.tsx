import { Projects } from "app/components/projects"

export default function Page() {
	return (
		<section>
			<hgroup className="mb-8 ">
				<h1 className="text-2xl font-semibold tracking-tighter">
					Christofer Koeth
				</h1>
				<p className="text-gray-300">Aka VDawg</p>
			</hgroup>
			<p className="mb-4">
				{`Front-end developer. I like code, design and art. Always looking for new challenges.`}
			</p>
			<div className="my-8">
				<Projects />
			</div>
		</section>
	)
}
