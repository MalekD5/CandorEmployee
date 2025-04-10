"use client";

import Button from "@/components/atom/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Logout() {
	const router = useRouter();
	return (
		<Button
			color="destructive"
			onClick={() => {
				signOut({
					fetchOptions: {
						onSuccess: () => {
							router.replace("/");
						},
					},
				});
			}}
		>
			Logout
		</Button>
	);
}
