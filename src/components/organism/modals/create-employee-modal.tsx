"use client";

import type React from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/organism/dialog";
import Button from "@/components/atom/button";
import UnifiedInput from "@/components/atom/unified-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/organism/select";
import { createEmployeeSchema } from "@/lib/zod-schemas";
import { toast, ToastContainer } from "react-toastify";

interface CreateEmployeeModalProps {
	open: boolean;
	onClose: () => void;
	onCreateEmployee: (employee: Employee) => void;
}

export function CreateEmployeeModal({
	open,
	onClose,
	onCreateEmployee,
}: CreateEmployeeModalProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		console.log("form", formData);

		const parsedData = createEmployeeSchema.safeParse(
			Object.fromEntries(formData),
		);
		if (!parsedData.success || !parsedData.data) {
			toast.error(parsedData.error.message);
			return;
		}

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const data = parsedData.data!;

		console.log("parsed", data);
		console.log("parsed", JSON.stringify(data));

		const result = await fetch("/api/employees/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const added = await result.json();

		onCreateEmployee({ ...added });

		if (result?.status >= 400) {
			toast.error(result.text());
		} else {
			toast.success("Employee created successfully");
			onClose();
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create New Employee</DialogTitle>
					<DialogDescription>
						Add a new employee to your organization.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<UnifiedInput
							label="Name *"
							id="name"
							name="name"
							className="col-span-3"
							required
						/>

						<UnifiedInput
							label="Position *"
							id="position"
							name="position"
							className="col-span-3"
							required
						/>

						<div className="flex flex-col bg-white cursor-text gap-2 flex-nowrap">
							<label htmlFor="department">Department *</label>
							<Select name="department" required>
								<SelectTrigger className="col-span-3 w-full">
									<SelectValue placeholder="Select department" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Engineering">Engineering</SelectItem>
									<SelectItem value="Product">Product</SelectItem>
									<SelectItem value="Design">Design</SelectItem>
									<SelectItem value="Marketing">Marketing</SelectItem>
									<SelectItem value="Human Resources">
										Human Resources
									</SelectItem>
									<SelectItem value="Finance">Finance</SelectItem>
									<SelectItem value="Sales">Sales</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<UnifiedInput
							label="Email *"
							id="email"
							name="email"
							type="email"
							className="col-span-3"
							required
						/>

						<UnifiedInput
							label="Phone"
							id="phone"
							name="phone"
							className="col-span-3"
						/>

						<UnifiedInput
							label="Start Date"
							id="startDate"
							name="startDate"
							type="date"
							className="col-span-3"
						/>
					</div>

					<DialogFooter>
						<Button type="button" color="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Create Employee</Button>
					</DialogFooter>
				</form>
			</DialogContent>
			<ToastContainer />
		</Dialog>
	);
}
