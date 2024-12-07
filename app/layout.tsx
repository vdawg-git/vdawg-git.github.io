import "./global.css"
import type { Metadata } from "next"
import { Navbar } from "./components/nav"
import Footer from "./components/footer"
import { baseUrl } from "./sitemap"
import "@fontsource/courier-prime/400.css"
import "@fontsource/courier-prime/700.css"

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
			<body className="antialiased h-screen w-screen   ">
				<main className="min-h-0 h-full mx-6 lg:mx-8     min-w-0  flex flex-col px-2 md:px-0">
					<Navbar />
					<div className="grow">{children}</div>
					<Footer />
				</main>
			</body>
		</html>
	)
}
