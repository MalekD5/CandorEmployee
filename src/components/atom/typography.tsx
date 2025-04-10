import { twMerge } from "tailwind-merge";
import { type VariantProps, tv } from "tailwind-variants";

const typographyVariants = tv({
	base: "text-zinc-600",
	variants: {
		level: {
			1: "text-4xl font-bold",
			2: "text-3xl",
			3: "text-2xl",
			4: "text-xl",
			5: "text-lg",
			6: "text-base",
		},
		bold: {
			true: "font-bold",
		},
		center: {
			true: "text-center",
		},
	},
});

type TypographyProps = {
	className?: string;
	center?: boolean;
} & VariantProps<typeof typographyVariants> &
	React.PropsWithChildren;

export default function Typography({
	level,
	bold,
	className,
	center,
	children,
}: TypographyProps) {
	const Component = (level ? `h${level}` : "p") as React.ElementType;
	return (
		<Component
			className={twMerge(
				typographyVariants({ level: level || 6, bold, center }),
				className,
			)}
		>
			{children}
		</Component>
	);
}
