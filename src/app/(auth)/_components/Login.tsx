"use client";

import Button from "@/components/atom/button";
import Input from "@/components/atom/input";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export default function Login() {
	return (
		<>
			<h1>Login</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const { email, password } = Object.fromEntries(formData) as {
						email: string;
						password: string;
					};

					const { data, error } = await signIn.email({
						email,
						password,
						fetchOptions: {
							onSuccess: () => {},
							onError: () => {},
						},
					});
					console.log(data, error);
				}}
			>
				<Input name="email" placeholder="email" type="email" />
				<Input name="password" placeholder="password" type="password" />
				<Button type="submit">Login</Button>
			</form>
		</>
	);
}
