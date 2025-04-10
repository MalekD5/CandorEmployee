"use client";

import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import Input, { inputVariants } from "../atom/input";

const iconInputVariants = tv({
	extend: inputVariants,
	base: "border border-gray-300 flex items-start justify-between gap-2",
	variants: {
		focused: {
			true: "outline-accent outline-2",
			false: "",
		},
	},
});

type IconInputProps = {
	label?: string;
} & Omit<
	VariantProps<typeof iconInputVariants>,
	"focused" | "focusable" | "type"
> &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function PasswordInput({
	size,
	rounded,
	label,
	name,
	onFocus,
	onBlur,
	...props
}: IconInputProps) {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const ref = useRef<HTMLInputElement>(null);

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
		<div className="flex flex-col gap-1">
			{label && <label htmlFor={name}>{label}</label>}

			<div className={constructedClassName}>
				<Input
					className="rounded-l-none"
					onFocus={handleFocus}
					onFocusCapture={handleFocus}
					onBlur={handleBlur}
					rounded
					focusable={false}
					{...props}
					type={showPassword ? "text" : "password"}
					size="empty"
					ref={ref}
					name={name}
				/>
				{showPassword ? (
					<EyeOpenIcon
						className={`self-center hover:cursor-pointer size-5 ${focused ? "text-accent" : "text-zinc-500"}`}
						onClick={() => {
							setShowPassword(false);
							ref.current?.focus();
						}}
					/>
				) : (
					<EyeNoneIcon
						className={`self-center hover:cursor-pointer size-5 ${focused ? "text-accent" : "text-zinc-500"}`}
						onClick={(e) => {
							e.stopPropagation();
							setShowPassword(true);
							ref.current?.focus();
						}}
					/>
				)}
			</div>
		</div>
	);
}
