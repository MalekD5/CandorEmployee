"use client";

import SignInTemplate from "@/components/template/sign-in-template";
import { signIn } from "@/lib/auth-client";
import { Suspense } from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
	return (
		<Suspense>
			<SignInTemplate
				onSignIn={async (e, setLoading, router) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const { email, password } = Object.fromEntries(formData) as {
						email: string;
						password: string;
					};

					setLoading(true);

					await signIn.email({
						email,
						password,
						fetchOptions: {
							onSuccess: () => {
								router.replace("/");
							},
							onError: () => {
								toast.error("Invalid email or password");
							},
							onResponse: () => {
								setLoading(false);
							},
						},
					});
				}}
			/>
		</Suspense>
	);
}
