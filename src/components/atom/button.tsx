"use client";

import { twMerge } from "tailwind-merge";

import { type VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
	base: "text-white hover:cursor-pointer",
	variants: {
		color: {
			default: "bg-accent",
			destructive: "bg-destructive",
			warning: "bg-warning",
			success: "bg-success",
		},
		size: {
			default: "px-4 py-2",
			sm: "px-2 py-1 text-sm",
			lg: "px-6 py-3 text-xl",
			xl: "px-8 py-4 text-2xl",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-sm",
		},
	},
	defaultVariants: {
		color: "default",
		size: "default",
	},
});

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
	color,
	size,
	rounded,
	children,
	className,
	...props
}: ButtonProps) {
	const constructedClassName = buttonVariants({ color, size, rounded });

	return (
		<button className={twMerge(constructedClassName, className)} {...props}>
			{children}
		</button>
	);
}
