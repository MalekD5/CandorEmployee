"use client";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../atom/button";
import Form from "../atom/form";
import Spinner from "../atom/spinner";
import Typography from "../atom/typography";
import IconInput from "../molecule/icon-input";
import PasswordInput from "../molecule/password-input";

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
				<div className="bg-white flex flex-col gap-4 border border-zinc-300 p-10 rounded-xl">
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
						<IconInput
							Icon={EnvelopeClosedIcon}
							name="email"
							label="Email"
							placeholder="email@example.com"
							type="email"
							required
						/>
						<PasswordInput
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
					<hr className="border-zinc-400" />
					<Typography>
						Don't have an account?{" "}
						<Link href="/sign-up" className="text-accent underline">
							Sign up
						</Link>
					</Typography>
				</div>
			</div>
		</div>
	);
}
