import { Projects } from "app/components/projects"
import { Button } from "./components/button"
import { GlitchText } from "./components/glitchText"

export default function Page() {
	return (
		<section className="max-w-3xl  mx-auto ">
			<div className="min-h-80 flex flex-col max-w-2xl  mx-auto   items-start justify-center   h-[50vh] max-h-120">
				<hgroup className="mb-8 -mt-15 ">
					<h1 className="text-gray2">
						Christofer Koeth <span className="text-gray0 italic">VDawg </span>{" "}
						<span className="text-gray0">(⁀ᗢ⁀)</span>
					</h1>
					<GlitchText as={"h2"} className="text-lg">
						{`Front-End Developer,\nWebdesigner`}
					</GlitchText>
				</hgroup>

				<Button className="flex " as="a" href="mailto:imchris@tuta.io">
					Say hi
				</Button>
			</div>
			<p className="mb-4 text-gray2 ">
				{`I like code, design and art. Always looking for new challenges.`}
			</p>
			<div className="my-8">
				<Projects />
			</div>
		</section>
	)
}
