"use client";

import UnifiedInput from "@/components/atom/unified-input";
import CreateEmployeeCard from "@/components/organism/create-employee";
import Employee from "@/components/organism/employee";
import { CreateEmployeeModal } from "@/components/organism/modals/create-employee-modal";
import { ConfirmDeleteModal } from "@/components/organism/modals/delete-employee-modal";
import { EditEmployeeModal } from "@/components/organism/modals/edit-employee-modal";
import { ViewEmployeeModal } from "@/components/organism/modals/view-employee-modal";
import { useState } from "react";

export default function EmployeeClient() {
	const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
	const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
	const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const [employees] = useState<Employee[]>([
		{
			id: 1,
			name: "Alex Johnson",
			position: "Senior Developer",
			department: "Engineering",
			email: "alex.j@company.com",
			phone: "+1 (555) 123-4567",
			startDate: "2020-03-15",
		},
		{
			id: 2,
			name: "Sarah Williams",
			position: "Product Manager",
			department: "Product",
			email: "sarah.w@company.com",
			phone: "+1 (555) 234-5678",
			startDate: "2019-06-22",
		},
		{
			id: 3,
			name: "Michael Brown",
			position: "UX Designer",
			department: "Design",
			email: "michael.b@company.com",
			phone: "+1 (555) 345-6789",
			startDate: "2021-01-10",
		},
		{
			id: 4,
			name: "Emily Davis",
			position: "Marketing Specialist",
			department: "Marketing",
			email: "emily.d@company.com",
			phone: "+1 (555) 456-7890",
			startDate: "2022-04-05",
		},
		{
			id: 5,
			name: "David Wilson",
			position: "HR Manager",
			department: "Human Resources",
			email: "david.w@company.com",
			phone: "+1 (555) 567-8901",
			startDate: "2018-11-30",
		},
	]);
	return (
		<>
			<div className="flex items-center mb-6 gap-0.5 md:gap-2 mt-12 md:mt-0">
				<div className="flex-1">
					<div className="relative">
						<UnifiedInput
							className="p-2 text-lg"
							search
							placeholder="Enter Employee name or Department"
							onSubmit={(value) => console.log(value)}
							iconPosition="left"
						/>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<CreateEmployeeCard setCreateModalOpen={setCreateModalOpen} />
					{employees.map((employee) => (
						<Employee
							key={employee.id}
							employee={employee}
							setViewEmployee={setViewEmployee}
							setEditEmployee={setEditEmployee}
							setDeleteEmployee={setDeleteEmployee}
						/>
					))}
				</div>
			</div>

			{viewEmployee && (
				<ViewEmployeeModal
					employee={viewEmployee}
					open={!!viewEmployee}
					onClose={() => setViewEmployee(null)}
				/>
			)}

			{/* Edit Employee Modal */}
			{editEmployee && (
				<EditEmployeeModal
					employee={editEmployee}
					open={!!editEmployee}
					onClose={() => setEditEmployee(null)}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{deleteEmployee && (
				<ConfirmDeleteModal
					open={!!deleteEmployee}
					onClose={() => setDeleteEmployee(null)}
					onConfirm={() => {
						console.log(deleteEmployee);
						setDeleteEmployee(null);
					}}
					title="Delete Employee"
					description={`Are you sure you want to delete ${deleteEmployee.name}? This action cannot be undone.`}
				/>
			)}

			{/* Create Employee Modal */}
			<CreateEmployeeModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onCreateEmployee={(employee) => {
					console.log(employee);
					setCreateModalOpen(false);
				}}
			/>
		</>
	);
}
