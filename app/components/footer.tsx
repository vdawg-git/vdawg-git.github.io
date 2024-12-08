import { IconExternalLink } from "./icons/icons"

export default function Footer() {
	return (
		<footer className="">
			<div className="max-w-xl mx-auto p-8">
				<ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
					<li>
						<a
							className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/vdawg-git/portfolio2"
						>
							<IconExternalLink />
							<p className="ml-2 h-7">view source</p>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}
