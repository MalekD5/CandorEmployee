"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { type VariantProps, tv } from "tailwind-variants";

export const inputVariants = tv({
	base: "px-4 py-2",
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
			true: "border border-gray-300 focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50",
			false: "focus:!border-none focus:outline-none focus:ring-0 shadow-none",
		},
	},
	defaultVariants: {
		focusable: true,
		size: "base",
	},
});

type InputProps = { label?: string } & VariantProps<typeof inputVariants> &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, name, size, focusable, rounded, ...props }: InputProps,
		ref,
	) => {
		const constructedClassName = inputVariants({ size, rounded, focusable });

		return (
			<div className="flex flex-col gap-2">
				{label && <label htmlFor={name}>{label}</label>}
				<input
					ref={ref}
					className={twMerge(constructedClassName, className)}
					name={name}
					id={name}
					{...props}
				/>
			</div>
		);
	},
);

export default Input;
