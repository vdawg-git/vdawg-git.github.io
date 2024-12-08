import "./global.css"
import type { Metadata } from "next"
import { Navbar } from "./components/nav"
import Footer from "./components/footer"
import { baseUrl } from "./sitemap"
import "@fontsource/courier-prime/400.css"
import "@fontsource/courier-prime/700.css"
import { initialzeCodeBackground } from "./lib/backgroundCode/backgroundCode"

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "VDawg",
		template: "%s | VDawg Portfolio",
	},
	description: "Front-end dev and Designer",
	openGraph: {
		title: "VDawg Portfolio",
		// description: "This is my portfolio.",
		url: baseUrl,
		siteName: "VDawg",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="antialiased relative h-screen  bg-bg0">
				<main className="min-h-0 h-full min-w-0   flex flex-col px-4 ">
					<Navbar />
					<div className="grow">{children}</div>
					<Footer />
				</main>

				<div className="fixed inset-x-0 bottom-0 bg-radial-[100%_80%_at_60%_100%] mix-blend-color-dodge from-yellow/80 size-full  z-10 pointer-events-none"></div>

				<div className="code-background absolute inset-0 -z-50 mx-auto max-w-[1320px] text-xs opacity-[15%]">
					<pre>
						<code id="bg-code" className="hljs absolute top-24 left-0">
							{Array.from({ length: 90 }, (_, index) =>
								index.toString().repeat(index)
							).join("\n")}
						</code>
					</pre>
				</div>
			</body>
		</html>
	)
}
