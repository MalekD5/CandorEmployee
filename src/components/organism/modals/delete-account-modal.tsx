"use client";

import UnifiedInput from "@/components/atom/unified-input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/organism/alert-dialog";
import { deleteUser } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteAccountModalProps {
	open: boolean;
	onClose: () => void;
}

export function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
	const [password, setPassword] = useState("");

	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove all of your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="grid gap-4 py-4">
					<UnifiedInput
						label="Password"
						id="password"
						name="password"
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							try {
								await deleteUser({
									password,
								});
							} catch {
								toast.error("Invalid password");
							} finally {
								setPassword("");
								onClose();
							}
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						Delete Account
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
