import { cn } from "app/lib/helper"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type AProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type CustomButtonProps =
	| (ButtonProps & {
			as?: "button"
			href?: never
	  })
	| (AProps & {
			as: "a"
			href: string
	  })

export const Button: React.FC<CustomButtonProps> = ({
	as: Tag = "button",
	...props
}) => (
	// @ts-ignore
	<Tag
		{...props}
		className={cn(
			"inline-flex items-center hover:text-orange group/button justify-center",
			props.className
		)}
	>
		<pre>
			{"[ "}
			<span className="group-hover/button:underline group-hover/button:text-yellow">
				{props.children}
			</span>{" "}
			{" ]"}
		</pre>
	</Tag>
)
