"use client";

import { twMerge } from "tailwind-merge";

import { type VariantProps, tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "flex justify-center items-center text-white hover:cursor-pointer disabled:cursor-not-allowed active:translate-y-1 w-full",
	variants: {
		color: {
			default: "bg-accent disabled:bg-blue-800",
			destructive: "bg-destructive disabled:bg-red-800",
			warning: "bg-warning disabled:bg-yellow-600/90",
			success: "bg-success disabled:bg-green-900/90",
			ghost: "bg-transparent text-black font-bold",
			outline: "bg-transparent text-black font-bold border-2 border-black",
		},
		size: {
			default: "px-4 py-3",
			sm: "px-2 py-1 text-sm",
			lg: "px-6 py-3 text-xl",
			xl: "px-8 py-4 text-2xl",
			icon: "size-10",
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
