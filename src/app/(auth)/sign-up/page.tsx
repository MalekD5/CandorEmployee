"use client";

import SignUpTemplate from "@/components/template/sign-up-template";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
	return (
		<SignUpTemplate
			onSignUp={async (e, setLoading, router) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const { name, email, password } = Object.fromEntries(formData) as {
					name: string;
					email: string;
					password: string;
				};

				setLoading(true);

				console.log(name, email, password);

				await signUp.email({
					name,
					email,
					password,
					fetchOptions: {
						onSuccess: () => {
							router.replace("/sign-in?registered=true");
						},
						onError: (error) => {
							toast.error(error.error.message);
						},
						onResponse: () => {
							setLoading(false);
						},
					},
				});
			}}
		/>
	);
}
