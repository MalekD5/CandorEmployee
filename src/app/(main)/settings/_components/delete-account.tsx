"use client";

import Button from "@/components/atom/button";
import { DeleteAccountModal } from "@/components/organism/modals/delete-account-modal";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function DeleteAccountCard() {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const handleDeleteAccount = () => {
		// In a real app, this would call an API to delete the account
		alert("Account deleted successfully!");
		setDeleteModalOpen(false);
	};
	return (
		<>
			<Button
				color="destructive"
				className="w-fit"
				onClick={() => setDeleteModalOpen(true)}
			>
				<AlertTriangle className="mr-2 h-4 w-4" />
				Delete Account
			</Button>

			<DeleteAccountModal
				open={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={handleDeleteAccount}
			/>
		</>
	);
}
