"use client";

import type React from "react";

import Button from "@/components/atom/button";
import UnifiedInput from "@/components/atom/unified-input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/organism/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/organism/select";
import { useState } from "react";

interface EditEmployeeModalProps {
	employee: Employee;
	open: boolean;
	onClose: () => void;
}

export function EditEmployeeModal({
	employee,
	open,
	onClose,
}: EditEmployeeModalProps) {
	const [formData, setFormData] = useState<Employee>({ ...employee });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this would call an API to update the employee
		console.log("Updated employee:", formData);
		alert(`Employee ${formData.name} updated!`);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Employee</DialogTitle>
					<DialogDescription>
						Make changes to the employee information here.
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
						<Button type="submit">Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
