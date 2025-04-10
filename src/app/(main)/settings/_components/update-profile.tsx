"use client";

import Button from "@/components/atom/button";
import { CardContent, CardFooter } from "@/components/atom/card";
import UnifiedInput from "@/components/atom/unified-input";
import { updateUser } from "@/lib/auth-client";
import { updateProfileSchema } from "@/lib/zod-schemas";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

type UpdateProfileFormProps = {
	email?: string;
	name?: string;
};

export default function UpdateProfileForm({
	email,
	name,
}: UpdateProfileFormProps) {
	const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("ok");

		const formData = new FormData(e.currentTarget);

		const parsedData = updateProfileSchema.safeParse({
			name: formData.get("name") as string,
			email: formData.get("email") as string,
		});

		if (!parsedData.success || !parsedData.data) {
			toast.error(parsedData.error.message);
			return;
		}

		try {
			const x = await updateUser({
				name: parsedData.data.name,
			});
			console.log("data", x.data);
		} catch {
			toast.error("Invalid name");
		}
	};

	return (
		<form onSubmit={handleUpdateProfile}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<UnifiedInput
						id="name"
						defaultValue={name}
						label="Name"
						name="name"
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
