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
		<aside className="mb-4 sticky top-0  flex text-xs justify-center">
			<nav
				className="flex flex-row justify-center bg-bg0 max-w-max  relative px-4 pb-0 items-center "
				id="nav"
			>
				<Link
					href="/"
					className="flex gap-3 hover:text-yellow  uppercase items-center"
				>
					VDawg
					<Image src={"/logo.svg"} alt="logo" width={48} height={48} />
				</Link>
				<div className="flex flex-row space-x-0 pr-10 items-center">
					{Object.entries(navItems).map(([path, { ToRender }]) => {
						return (
							<Link
								key={path}
								href={path}
								className=" hover:text-yellow uppercase  text-xs  flex align-middle relative py-1 px-2 m-1"
							>
								<ToRender />
							</Link>
						)
					})}
				</div>
			</nav>
		</aside>
	)
}
