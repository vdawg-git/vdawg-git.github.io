import { PlaywrightLogo } from "./icons/PlaywrightLogo"
import { PrismaLogo } from "./icons/PrismaLogo"
import { SkillIconsElectron } from "./icons/SkillIconsElectron"
import SkillIconsFigmaDark from "./icons/SkillIconsFigmaDark"
import SkillIconsLinuxDark from "./icons/SkillIconsLinuxDark"
import { SkillIconsNextjsDark } from "./icons/SkillIconsNextDark"
import { SkillIconsNodejsDark } from "./icons/SkillIconsNodejs"
import SkillIconsPhotoshop from "./icons/SkillIconsPhotoshop"
import { SkillIconsReactDark } from "./icons/SkillIconsReactDark"
import SkillIconsReactivexDark from "./icons/SkillIconsReactivexDark"
import SkillIconsRust from "./icons/SkillIconsRust"
import SkillIconsSvelte from "./icons/SkillIconsSvelte"
import SkillIconsTailwindcssDark from "./icons/SkillIconsTailwindcssDark"
import SkillIconsTypescript from "./icons/SkillIconsTypescript"

type Tech =
	| "prisma"
	| "figma"
	| "rust"
	| "playwright"
	| "next"
	| "react"
	| "tailwind"
	| "typescript"
	| "node"
	| "svelte"
	| "linux"
	| "photoshop"
	| "rxjs"
	| "electron"
type Data = Record<Tech, { name: string; Icon: React.FC }>

const techstacks: Data = {
	figma: {
		name: "Figma",
		Icon: () => <SkillIconsFigmaDark />,
	},
	linux: {
		name: "Linux",
		Icon: () => <SkillIconsLinuxDark />,
	},
	next: {
		name: "Next.js",
		Icon: () => <SkillIconsNextjsDark />,
	},
	photoshop: {
		name: "Photoshop",
		Icon: () => <SkillIconsPhotoshop />,
	},
	react: {
		name: "React",
		Icon: () => <SkillIconsReactDark />,
	},
	rust: {
		name: "Rust",
		Icon: () => <SkillIconsRust />,
	},
	rxjs: {
		name: "RxJS",
		Icon: () => <SkillIconsReactivexDark />,
	},
	svelte: {
		name: "Svelte",
		Icon: () => <SkillIconsSvelte />,
	},
	tailwind: {
		name: "Tailwind",
		Icon: () => <SkillIconsTailwindcssDark />,
	},
	typescript: {
		name: "TypeScript",
		Icon: () => <SkillIconsTypescript />,
	},
	electron: {
		name: "Electron",
		Icon: () => <SkillIconsElectron />,
	},
	node: {
		name: "NodeJs",
		Icon: () => <SkillIconsNodejsDark />,
	},
	prisma: {
		name: "Prisma",
		Icon: () => <PrismaLogo />,
	},
	playwright: {
		name: "Playwright",
		Icon: () => <PlaywrightLogo />,
	},
}

type Props = {
	techs: Tech[]
}

export function TechStack({ techs }: Props) {
	return (
		<div className="flex flex-wrap gap-4">
			{techs.map((key) => {
				const data = techstacks[key.toLowerCase()]
				if (!data) {
					console.error(`Tech ${key} not found`)
				}
				const { Icon, name } = data

				return (
					<div key={key} className="size-8" title={name}>
						<Icon width={32} height={32} className="size-8" />
					</div>
				)
			})}
		</div>
	)
}
