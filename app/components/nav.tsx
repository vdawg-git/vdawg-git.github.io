import Link from "next/link"
import { Logo } from "./icons/logo-icon.tsx"
import "./nav.css"
import { links } from "./consts.tsx"
import Image from "next/image"

// Lets keep it simple for now
const navItems = {
	"/projects": {
		ToRender: () => <>Projects</>,
	},
}

export function Navbar() {
	return (
		<aside className="mb-4 grow-0 flex max-w-3xl mx-auto w-full text-[0.65rem] z-50 text-dimYellow justify-center nav">
			<nav
				className=" w-full  grid grid-cols-[1fr_auto_1fr]   relative px-4 pb-0 items-center "
				id="nav"
			>
				<div className="justify-self-start">✦―――――✦―――――✦</div>

				<div className="flex">
					<Link
						href="/"
						className="flex gap-3 hover:text-yellow  uppercase items-center"
					>
						VDawg
						<Logo width={48} height={48} className="size-12" />
					</Link>

					<div className="flex flex-row space-x-0  items-center justify-self-center">
						{Object.entries(navItems).map(([path, { ToRender }]) => {
							return (
								<Link
									key={path}
									href={path}
									className=" hover:text-yellow uppercase    flex align-middle relative py-1 px-2 m-1"
								>
									<ToRender />
								</Link>
							)
						})}
					</div>
				</div>

				<ul className="hidden sm:flex gap-4 justify-self-end ">
					{links.map(({ link, Icon }) => (
						<li key={link}>
							<a
								rel="noopener noreferrer"
								target="_blank"
								href={link}
								className="flex gap-1 items-center [&>*]:hover:text-dimAqua"
							>
								<Icon className="size-5" />
							</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}
