"use client";

import { EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../atom/button";
import Card from "../atom/card";
import Form from "../atom/form";
import Separator from "../atom/separator";
import Spinner from "../atom/spinner";
import Typography from "../atom/typography";
import UnifiedInput from "../atom/unified-input";

type SignUpTemplateProps = {
	onSignUp: (
		e: React.FormEvent<HTMLFormElement>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		router: AppRouterInstance,
	) => void;
};

export default function SignUpTemplate({
	onSignUp: onSignIn,
}: SignUpTemplateProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-foreground">
			<div className="w-full max-w-sm">
				<Card>
					<div className="flex flex-col gap-1">
						<Typography center level={1} className="text-xl">
							Register
						</Typography>
						<Typography center className="text-zinc-600 text-sm">
							Enter your information below to register an account
						</Typography>
					</div>
					<Form
						onSubmit={(e) => onSignIn(e, setLoading, router)}
						className="flex flex-col gap-4"
					>
						<UnifiedInput
							icon={PersonIcon}
							name="name"
							label="Name"
							placeholder="Name"
							required
							focusOutlineColor="success"
							iconFocusColor="success"
						/>
						<UnifiedInput
							icon={EnvelopeClosedIcon}
							name="email"
							label="Email"
							placeholder="email@example.com"
							type="email"
							focusOutlineColor="success"
							iconFocusColor="success"
							required
						/>
						<UnifiedInput
							name="password"
							label="Password"
							placeholder="password"
							focusOutlineColor="success"
							iconFocusColor="success"
							required
							password
						/>
						<Button
							color="success"
							className="flex justify-center items-center"
							type="submit"
							disabled={loading}
						>
							{loading ? <Spinner className="size-6" /> : "Register"}
						</Button>
					</Form>
					<Separator />
					<Typography center className="text-sm">
						Already have an account?{" "}
						<Link href="/sign-in" className="text-success underline">
							Sign in
						</Link>
					</Typography>
				</Card>
			</div>
		</div>
	);
}
