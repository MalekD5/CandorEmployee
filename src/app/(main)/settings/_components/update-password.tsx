"use client";
import Button from "@/components/atom/button";
import { CardContent, CardFooter } from "@/components/atom/card";
import UnifiedInput from "@/components/atom/unified-input";
import { changePassword } from "@/lib/auth-client";
import { updatePasswordSchema } from "@/lib/zod-schemas";
import { toast } from "react-toastify";

export default function UpdatePasswordForm() {
	const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const parsedData = updatePasswordSchema.safeParse({
			currentPassword: formData.get("currentPassword") as string,
			newPassword: formData.get("newPassword") as string,
			confirmPassword: formData.get("confirmPassword") as string,
		});

		if (!parsedData.success || !parsedData.data) {
			toast.error(parsedData.error.message);
			return;
		}

		try {
			changePassword({
				currentPassword: parsedData.data.currentPassword,
				newPassword: parsedData.data.newPassword,
			});
		} catch {
			toast.error("Invalid password");
		}
	};
	return (
		<form onSubmit={handleChangePassword}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<UnifiedInput
						label="Current Password"
						id="current_password"
						name="currentPassword"
						type="password"
						placeholder="Current password"
						required
					/>
				</div>
				<div className="space-y-2">
					<UnifiedInput
						label="New Password"
						id="new_password"
						name="newPassword"
						type="password"
						placeholder="New password"
						required
					/>
				</div>
				<div className="space-y-2">
					<UnifiedInput
						label="Confirm Password"
						id="confirm_password"
						name="confirmPassword"
						type="password"
						placeholder="Confirm new password"
						required
					/>
				</div>
			</CardContent>
			<CardFooter className="mt-2">
				<Button className="w-fit" type="submit">
					Update Password
				</Button>
			</CardFooter>
		</form>
	);
}
