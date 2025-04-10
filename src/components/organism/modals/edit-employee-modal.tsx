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
import { updateEmployeeSchema } from "@/lib/zod-schemas";
import { toast } from "react-toastify";

interface EditEmployeeModalProps {
	employee: Employee;
	open: boolean;
	onClose: () => void;
	onUpdateEmployee: (employee: Employee) => void;
}

export function EditEmployeeModal({
	onUpdateEmployee,
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const parsedData = updateEmployeeSchema.safeParse({
			...Object.fromEntries(formData),
			id: employee.id,
		});

		if (!parsedData.success || !parsedData.data) {
			toast.error(parsedData.error.message);
			return;
		}

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const data = parsedData.data!;

		const result = await fetch("/api/employees/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (result?.status >= 400) {
			toast.error(result.text());
		} else {
			onUpdateEmployee(data as unknown as Employee);
			toast.success("Employee created successfully");
			onClose();
		}
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
								name="department"
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
							className="col-span-3"
							defaultValue={(employee.startDate as string).split("T")[0]}
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
