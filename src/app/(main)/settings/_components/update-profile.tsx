"use client";

import Button from "@/components/atom/button";
import { CardContent, CardFooter } from "@/components/atom/card";
import UnifiedInput from "@/components/atom/unified-input";
import { Save } from "lucide-react";

type UpdateProfileFormProps = {
	email?: string;
	name?: string;
};

export default function UpdateProfileForm({
	email,
	name,
}: UpdateProfileFormProps) {
	const handleUpdateProfile = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this would call an API to update the profile
		alert("Profile updated successfully!");
	};

	return (
		<form onSubmit={handleUpdateProfile}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<UnifiedInput
						id="name"
						defaultValue={name}
						label="Name"
						placeholder="Your name"
					/>
				</div>
				<div className="space-y-2">
					<UnifiedInput
						value={email}
						label="Email"
						id="email"
						type="email"
						placeholder="Your email"
						disabled
						readOnly
					/>
					<p className="text-sm text-muted-foreground">
						Your email address is used for login and cannot be changed.
					</p>
				</div>
			</CardContent>
			<CardFooter className="mt-2">
				<Button type="submit" className="w-fit">
					<Save className="mr-2 h-4 w-4" />
					Save Changes
				</Button>
			</CardFooter>
		</form>
	);
}
