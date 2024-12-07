import Image from "next/image"
import Link from "next/link"

const navItems = {
	"/": {
		ToRender: () => <>home</>,
	},
	// "/blog": {
	// 	name: "blog",
	// },
}

export function Navbar() {
	return (
		<aside className="-ml-[8px] mb-16 tracking-tight">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
					id="nav"
				>
					<Image src={"/logo.svg"} alt="logo" width={30} height={30} />
					<div className="flex flex-row space-x-0 pr-10">
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
