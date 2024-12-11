import { cn } from "app/lib/helper"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type AProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const variantsContainer = cva(
	"inline-flex items-center hover:text-orange group/button justify-center",
	{
		variants: {
			color: {
				default: "text-gray2 hover:text-orange",
				yellow: "text-orange",
			},
		},
		defaultVariants: {
			color: "default",
		},
	}
)

const variantsText = cva("group-hover/button:underline ", {
	variants: {
		color: {
			default: "text-fg group-hover/button:text-yellow",
			yellow: "text-yellow",
		},
	},
	defaultVariants: {
		color: "default",
	},
})

type CustomButtonProps = (
	| (ButtonProps & {
			as?: "button"
			href?: never
	  })
	| (AProps & {
			as: "a"
			href: string
	  })
) &
	VariantProps<typeof variantsContainer>

export const Button: React.FC<CustomButtonProps> = ({
	as: Tag = "button",
	className,
	color = "default",
	...props
}) => (
	// @ts-ignore
	<Tag {...props} className={cn(variantsContainer({ className, color }))}>
		[&nbsp;
		<span className={variantsText({ color })}>{props.children}</span> &nbsp;]
	</Tag>
)
