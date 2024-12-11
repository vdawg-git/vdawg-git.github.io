import { IconExternalLink, IconGithub } from "./icons/icons"

export default function Footer() {
	return (
		<footer className="[&_a]:hover:text-orange grow-0 [&_a]:hover:underline">
			<div className="max-w-2xl mx-auto mt-8 p-8 border-bg4 border-t-8 border-double">
				<ul className="font-sm    flex flex-col space-x-0 space-y-2  md:flex-row md:space-x-4 md:space-y-0 text-fg0">
					<li>
						<a
							className="flex  items-center gap-1   hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/vdawg-git"
						>
							<IconGithub />
							<p className="">Github</p>
						</a>
					</li>
					<li>
						<a
							className="flex items-center gap-1   hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/vdawg-git/portfolio2"
						>
							<IconExternalLink />
							<p className="">view source</p>
						</a>
					</li>
				</ul>

				<div className="i-pixelarticons-ab-testing size-80 bg-red/5"></div>
			</div>
		</footer>
	)
}
