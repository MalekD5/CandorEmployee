import type React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/atom/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UpdateProfileForm from "./_components/update-profile";
import { redirect } from "next/navigation";
import UpdatePasswordForm from "./_components/update-password";
import DeleteAccountCard from "./_components/delete-account";

export default async function SettingsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/sign-in");
	}

	const user = session.user;

	return (
		<div className="container mx-auto max-w-4xl py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">Settings</h1>

			<div className="space-y-8">
				{/* Profile Information */}
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
						<CardDescription>
							Update your account's profile information.
						</CardDescription>
					</CardHeader>
					<UpdateProfileForm email={user.email} name={user.name} />
				</Card>

				{/* Change Password */}
				<Card>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription>
							Ensure your account is using a secure password.
						</CardDescription>
					</CardHeader>
					<UpdatePasswordForm />
				</Card>

				{/* Delete Account */}
				<Card className="border-destructive/20">
					<CardHeader className="text-destructive">
						<CardTitle>Delete Account</CardTitle>
						<CardDescription>
							Permanently delete your account and all of your data.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Once your account is deleted, all of its resources and data will
							be permanently deleted. Before deleting your account, please
							download any data or information that you wish to retain.
						</p>
						<DeleteAccountCard />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
