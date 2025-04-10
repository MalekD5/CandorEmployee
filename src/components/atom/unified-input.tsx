"use client";

import {
	EyeNoneIcon,
	EyeOpenIcon,
	MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { type VariantProps, tv } from "tailwind-variants";

// Tailwind-safe input styling
const inputVariants = tv({
	base: "w-full bg-transparent outline-none text-black",
	variants: {
		size: {
			empty: "p-0",
			base: "px-2",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-md",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

// Wrapper (outer div) variants
const wrapperVariants = tv({
	base: "flex items-center border border-gray-300 gap-2 w-full transition-colors focus-within:outline-2",
	variants: {
		iconPosition: {
			left: "flex-row",
			right: "flex-row-reverse",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-md",
		},
	},
	defaultVariants: {
		iconPosition: "right",
		rounded: false,
	},
});

// Focus outline color map (applied to the outer div)
const focusOutlineColorMap: Record<string, string> = {
	accent: "focus-within:outline-accent",
	success: "focus-within:outline-success",
	error: "focus-within:outline-red-500",
	warning: "focus-within:outline-yellow-500",
	info: "focus-within:outline-blue-500",
};

// Icon color map (applied to the icon only)
const iconColorMap: Record<string, string> = {
	accent: "text-accent",
	success: "text-success",
	error: "text-red-500",
	warning: "text-yellow-500",
	info: "text-blue-500",
};

const getOutlineClass = (color?: string) =>
	focusOutlineColorMap[color ?? "accent"] ?? focusOutlineColorMap.accent;

const getIconColorClass = (color?: string) =>
	iconColorMap[color ?? "accent"] ?? iconColorMap.accent;

type BaseInputProps = {
	label?: string;
	icon?: React.ElementType;
	password?: boolean;
	search?: boolean;
	onSubmit?: (query: string) => void;
	iconPosition?: "left" | "right";
	rightIconClassName?: string;
	focusOutlineColor?: string;
	iconFocusColor?: string;
} & VariantProps<typeof inputVariants> &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const UnifiedInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
	(
		{
			label,
			name,
			icon: Icon,
			password,
			search,
			onFocus,
			onBlur,
			onSubmit,
			rounded,
			size,
			iconPosition = "right",
			className,
			rightIconClassName,
			focusOutlineColor,
			iconFocusColor,
			...props
		},
		ref,
	) => {
		const internalRef = useRef<HTMLInputElement>(null);
		const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;
		const [focused, setFocused] = useState(false);
		const [showPassword, setShowPassword] = useState(false);

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setFocused(true);
			onFocus?.(e);
		};

		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			setFocused(false);
			onBlur?.(e);
		};

		const handleIconClick = () => {
			inputRef.current?.focus();
		};

		const handleSubmit = (e: React.MouseEvent) => {
			e.preventDefault();
			if (onSubmit && inputRef.current) {
				onSubmit(inputRef.current.value);
			}
		};

		const wrapperClass = wrapperVariants({
			iconPosition,
			rounded,
		});

		const isCompound = password || search || Icon;
		const inputClass = inputVariants({
			size: isCompound ? "empty" : size,
			rounded,
		});

		const inputType = password
			? showPassword
				? "text"
				: "password"
			: (props.type ?? "text");

		const iconColor = focused
			? getIconColorClass(iconFocusColor)
			: "text-zinc-500";

		const renderIcon = () => {
			switch (true) {
				case password:
					return showPassword ? (
						<EyeOpenIcon
							className={twMerge(
								"self-center size-5 hover:cursor-pointer",
								iconColor,
								rightIconClassName,
							)}
							onClick={(e) => {
								e.stopPropagation();
								setShowPassword(false);
							}}
						/>
					) : (
						<EyeNoneIcon
							className={twMerge(
								"self-center size-5 hover:cursor-pointer",
								iconColor,
								rightIconClassName,
							)}
							onClick={(e) => {
								e.stopPropagation();
								setShowPassword(true);
							}}
						/>
					);

				case search:
					return (
						<button type="submit" onClick={handleSubmit}>
							<MagnifyingGlassIcon
								className={twMerge(
									"self-center size-5 hover:cursor-pointer",
									iconColor,
									rightIconClassName,
								)}
							/>
						</button>
					);

				case !!Icon:
					return (
						<Icon
							className={twMerge(
								"self-center size-5",
								iconColor,
								rightIconClassName,
							)}
						/>
					);

				default:
					return null;
			}
		};

		return (
			<div className="flex flex-col gap-1 w-full">
				{label && (
					<label htmlFor={name} className="text-black">
						{label}
					</label>
				)}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className={twMerge(
						wrapperClass,
						getOutlineClass(focusOutlineColor),
						"px-3 py-2",
					)}
					onClick={handleIconClick}
				>
					{renderIcon()}
					<input
						{...props}
						type={inputType}
						ref={inputRef}
						name={name}
						id={name}
						className={twMerge(inputClass, className)}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
				</div>
			</div>
		);
	},
);

UnifiedInput.displayName = "UnifiedInput";

export default UnifiedInput;
