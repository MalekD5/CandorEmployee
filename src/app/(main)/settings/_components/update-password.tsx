"use client";
import Button from "@/components/atom/button";
import { CardContent, CardFooter } from "@/components/atom/card";
import UnifiedInput from "@/components/atom/unified-input";

export default function UpdatePasswordForm() {
	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleChangePassword}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<UnifiedInput
						label="Current Password"
						id="current_password"
						type="password"
						placeholder="Current password"
						required
					/>
				</div>
				<div className="space-y-2">
					<UnifiedInput
						label="New Password"
						id="new_password"
						type="password"
						placeholder="New password"
						required
					/>
				</div>
				<div className="space-y-2">
					<UnifiedInput
						label="Confirm Password"
						id="confirm_password"
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
