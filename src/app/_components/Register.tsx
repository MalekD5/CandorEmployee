"use client";

import Button from "@/components/atom/button";
import Input from "@/components/atom/input";
import { signUp } from "@/lib/auth-client";

export default function Register() {
	return (
		<>
			<h1>Register</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const { name, email, password } = Object.fromEntries(formData) as {
						name: string;
						email: string;
						password: string;
					};

					const { data, error } = await signUp.email({
						email,
						password,
						name,
					});
					console.log(data, error);
				}}
			>
				<Input name="name" placeholder="name" type="text" />
				<Input name="email" placeholder="email" type="email" />
				<Input name="password" placeholder="password" type="password" />
				<Button type="submit">Register</Button>
			</form>
		</>
	);
}
