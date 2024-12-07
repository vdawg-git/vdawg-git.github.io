import Image from "next/image"
import Link from "next/link"

const navItems = {
	// "/": {
	// 	ToRender: () => <>VDawg</>,
	// },
	"/projects": {
		ToRender: () => <>Projects</>,
	},
	// "/blog": {
	// 	name: "blog",
	// },
}

export function Navbar() {
	return (
		<aside className="-ml-[8px] mb-2 ">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-row  relative px-0 pb-0 fade md:overflow-auto items-center scroll-pr-1 md:relative"
					id="nav"
				>
					<Link href="/" className="flex gap-3 items-center">
						<Image src={"/logo.svg"} alt="logo" width={48} height={48} />
						VDawg
					</Link>
					<div className="grow"></div>
					<div className="flex flex-row space-x-0 pr-10 items-center">
						{Object.entries(navItems).map(([path, { ToRender }]) => {
							return (
								<Link
									key={path}
									href={path}
									className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
								>
									<ToRender />
								</Link>
							)
						})}
					</div>
				</nav>
			</div>
		</aside>
	)
}
