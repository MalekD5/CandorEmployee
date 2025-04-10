import { twMerge } from "tailwind-merge";

type FormProps = React.HTMLAttributes<HTMLFormElement>;

export default function Form({ children, className, ...props }: FormProps) {
	return (
		<form className={twMerge("flex flex-col gap-4", className)} {...props}>
			{children}
		</form>
	);
}
