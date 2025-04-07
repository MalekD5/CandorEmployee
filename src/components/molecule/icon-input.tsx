"use client";

import { useState } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import Input, { inputVariants } from "../atom/input";

const iconInputVariants = tv({
	extend: inputVariants,
	base: "!shadow-md flex items-center w-fit gap-2",
	variants: {
		focused: {
			true: "outline-accent outline-2",
			false: "",
		},
	},
});

type IconInputProps = {
	Icon: IconType;
} & Omit<VariantProps<typeof iconInputVariants>, "focused" | "focusable"> &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function IconInput({
	Icon,
	size,
	rounded,
	onFocus,
	onBlur,
	...props
}: IconInputProps) {
	const [focused, setFocused] = useState(false);

	const baseInputAttributes = { rounded, focusable: false };

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocused(true);
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocused(false);
		onBlur?.(e);
	};

	const constructedClassName = iconInputVariants({
		focusable: false,
		focused,
		size: "base",
	});

	return (
		<div className={constructedClassName}>
			{<Icon className="text-zinc-400 size-5" />}
			<Input
				className="rounded-l-none"
				onFocus={handleFocus}
				onFocusCapture={handleFocus}
				onBlur={handleBlur}
				{...baseInputAttributes}
				{...props}
				size="empty"
			/>
		</div>
	);
}
