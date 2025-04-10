"use client";

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

interface ConfirmDeleteModalProps {
	id: number;
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
}

export function ConfirmDeleteModal({
	id,
	open,
	onClose,
	onConfirm,
	title,
	description,
}: ConfirmDeleteModalProps) {
	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							const result = await fetch(`/api/employees/delete?id=${id}`, {
								method: "delete",
								headers: {
									"Content-Type": "application/json",
								},
							});

							onConfirm();
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
