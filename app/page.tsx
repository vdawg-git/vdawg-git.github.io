import { Projects } from "app/components/projects"
import { Button } from "./components/button"
import { GlitchText } from "./components/glitchText"

export default function Page() {
	return (
		<section className="max-w-3xl  mx-auto  ">
			<div className="flex flex-col max-w-2xl py-12  mx-auto   items-start justify-center   h-80 max-h-120">
				<span className="text-orange" aria-hidden>
					{" "}
					(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
				</span>
				<hgroup className="mb-8 ">
					<h1 className="text-yellow">Christofer Koeth</h1>
					<GlitchText as={"h2"} className="text-base text-gray1 leading-tight">
						{`Fullstack Developer &
						Designer`}
					</GlitchText>
				</hgroup>

				<div className="flex gap-2">
					<Button
						className="flex"
						color="yellow"
						as="a"
						href="mailto:imchris@tuta.io"
					>
						Say hi
					</Button>
				</div>
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
