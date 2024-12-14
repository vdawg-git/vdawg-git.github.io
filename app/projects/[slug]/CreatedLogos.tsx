import React, { type FunctionComponent } from "react"

type CreatedLogosProps = {}

type Logo = {
	name: string
	description: string
	image: string
	url: string
}

const logos: Logo[] = [
	{
		name: "Astal",
		description: "Craft Desktop Shells with GTK! (The name means table)",
		url: "https://aylur.github.io/astal/",
		image: "/images/projects/logos/astal.svg",
	},
	{
		name: "Borders Plus Plus",
		image: "/images/projects/logos/Borders-plus-plus-logo.svg",
		description: "Hyprland plugin to add extra borders to windows",
		url: "https://github.com/hyprwm/hyprland-plugins",
	},
	{
		name: "Hyprbars",
		description: "Custom window decorations for Hyprland windows",
		image: "/images/projects/logos/hyprbars-logo.svg",
		url: "https://github.com/hyprwm/hyprland-plugins",
	},
	{
		name: "Hyprtrails",
		description: "Smooth trails behind moving windows",
		image: "/images/projects/logos/hyprtrails-logo.svg",
		url: "https://github.com/hyprwm/hyprland-plugins",
	},
	{
		name: "Hyprwinwrap",
		image: "/images/projects/logos/hyprwinwrap-logo.svg",
		url: "https://github.com/hyprwm/hyprland-plugins",
		description: "Use any app as your wallpaper in Hyprland",
	},
]

export const CreatedLogos: FunctionComponent<CreatedLogosProps> = () => {
	return (
		<div className="flex flex-wrap">
			{logos.map(({ description, image, name, url }) => (
				<div key={name} className="flex flex-col max-w-40">
					<a href={url}>
						<img src={image} alt={name} className="size-40" />
					</a>
					<div className="p-1">
						<div>{name}</div>
						<div className="text-[12px]">{description}</div>
					</div>
				</div>
			))}
		</div>
	)
}
