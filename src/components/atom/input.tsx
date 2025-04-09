"use client";

import { twMerge } from "tailwind-merge";
import { type VariantProps, tv } from "tailwind-variants";

export const inputVariants = tv({
	base: "border-gray-300 px-4 py-2",
	variants: {
		size: {
			empty: "p-0",
			base: "px-4 py-2",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-md",
		},
		focusable: {
			true: "focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 shadow-md",
			false: "focus:!border-none focus:outline-none focus:ring-0 shadow-none",
		},
	},
	defaultVariants: {
		focusable: true,
		size: "base",
	},
});

type InputProps = VariantProps<typeof inputVariants> &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function Input({
	className,
	size,
	focusable,
	rounded,
	...props
}: InputProps) {
	const constructedClassName = inputVariants({ size, rounded, focusable });

	return (
		<input className={twMerge(constructedClassName, className)} {...props} />
	);
}
