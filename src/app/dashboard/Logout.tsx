"use client";

import Button from "@/components/atom/button";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Logout() {
	return (
		<Button
			color="destructive"
			onClick={() => {
				signOut({
					fetchOptions: {
						onSuccess: () => {
							redirect("/");
						},
					},
				});
			}}
		>
			Logout
		</Button>
	);
}
