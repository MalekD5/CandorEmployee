"use client";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../atom/button";
import Card from "../atom/card";
import Form from "../atom/form";
import Separator from "../atom/separator";
import Spinner from "../atom/spinner";
import Typography from "../atom/typography";
import UnifiedInput from "../atom/unified-input";

type SignInTemplateProps = {
	onSignIn: (
		e: React.FormEvent<HTMLFormElement>,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		router: AppRouterInstance,
	) => void;
};

export default function SignInTemplate({ onSignIn }: SignInTemplateProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const params = useSearchParams();

	useEffect(() => {
		if (params.get("registered") === "true") {
			toast.info("Account Registered Successfully, please login now");
		}
	}, [params]);

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-foreground">
			<ToastContainer />
			<div className="w-full max-w-sm">
				<Card>
					<div className="flex flex-col gap-1">
						<Typography center level={1} className="text-xl">
							Login
						</Typography>
						<Typography center className="text-zinc-600 text-sm">
							Enter your email below to login to your account
						</Typography>
					</div>
					<Form
						onSubmit={(e) => onSignIn(e, setLoading, router)}
						className="flex flex-col gap-4"
					>
						<UnifiedInput
							icon={EnvelopeClosedIcon}
							name="email"
							label="Email"
							placeholder="email@example.com"
							type="email"
							required
						/>
						<UnifiedInput
							password
							name="password"
							label="Password"
							placeholder="password"
							required
						/>
						<Button
							className="flex justify-center items-center"
							type="submit"
							disabled={loading}
						>
							{loading ? <Spinner className="size-6" /> : "Login"}
						</Button>
					</Form>
					<Separator />
					<Typography>
						Don't have an account?{" "}
						<Link href="/sign-up" className="text-accent underline">
							Sign up
						</Link>
					</Typography>
				</Card>
			</div>
		</div>
	);
}
