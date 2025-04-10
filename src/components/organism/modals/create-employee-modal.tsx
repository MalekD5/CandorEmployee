"use client";

import type React from "react";

import { useState } from "react";
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
	const [formData, setFormData] = useState<NewEmployee>({
		name: "",
		position: "",
		department: "",
		email: "",
		phone: "",
		startDate: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onCreateEmployee({ id: 1, ...formData });
		setFormData({
			name: "",
			position: "",
			department: "",
			email: "",
			phone: "",
			startDate: "",
		});
		onClose();
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
							value={formData.name}
							onChange={handleChange}
							className="col-span-3"
							required
						/>

						<UnifiedInput
							label="Position *"
							id="position"
							name="position"
							value={formData.position}
							onChange={handleChange}
							className="col-span-3"
							required
						/>

						<div className="flex flex-col bg-white cursor-text gap-2 flex-nowrap">
							<label htmlFor="department">Department *</label>
							<Select
								value={formData.department}
								onValueChange={(value) =>
									handleSelectChange("department", value)
								}
								required
							>
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
							value={formData.email}
							onChange={handleChange}
							className="col-span-3"
							required
						/>

						<UnifiedInput
							label="Phone"
							id="phone"
							name="phone"
							value={formData.phone || ""}
							onChange={handleChange}
							className="col-span-3"
						/>

						<UnifiedInput
							label="Start Date"
							id="startDate"
							name="startDate"
							type="date"
							value={formData.startDate || ""}
							onChange={handleChange}
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
		</Dialog>
	);
}
