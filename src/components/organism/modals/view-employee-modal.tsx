"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/organism/dialog";
import Button from "@/components/atom/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atom/avatar";

interface ViewEmployeeModalProps {
	employee: Employee;
	open: boolean;
	onClose: () => void;
}

export function ViewEmployeeModal({
	employee,
	open,
	onClose,
}: ViewEmployeeModalProps) {
	// Format date for display
	const formatDate = (dateString?: string) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center text-2xl">
						Employee Details
					</DialogTitle>
					<DialogDescription className="text-center">
						View detailed information about this employee.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center py-4">
					<Avatar className="h-24 w-24 mb-4">
						<AvatarImage src={employee.avatar} alt={employee.name} />
						<AvatarFallback className="text-xl">
							{employee.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>

					<h2 className="text-xl font-bold">{employee.name}</h2>
					<p className="text-muted-foreground">{employee.position}</p>
				</div>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-[120px_1fr] items-center gap-4">
						<span className="font-medium">Department:</span>
						<span>{employee.department}</span>
					</div>
					<div className="grid grid-cols-[120px_1fr] items-center gap-4">
						<span className="font-medium">Email:</span>
						<span className="break-all">{employee.email}</span>
					</div>
					<div className="grid grid-cols-[120px_1fr] items-center gap-4">
						<span className="font-medium">Phone:</span>
						<span>{employee.phone || "N/A"}</span>
					</div>
					<div className="grid grid-cols-[120px_1fr] items-center gap-4">
						<span className="font-medium">Start Date:</span>
						<span>{formatDate(employee.startDate)}</span>
					</div>
				</div>

				<DialogFooter>
					<Button onClick={onClose}>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
