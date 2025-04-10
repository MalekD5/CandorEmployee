"use client";

import UnifiedInput from "@/components/atom/unified-input";
import CreateEmployeeCard from "@/components/organism/create-employee";
import Employee from "@/components/organism/employee";
import { CreateEmployeeModal } from "@/components/organism/modals/create-employee-modal";
import { ConfirmDeleteModal } from "@/components/organism/modals/delete-employee-modal";
import { EditEmployeeModal } from "@/components/organism/modals/edit-employee-modal";
import { ViewEmployeeModal } from "@/components/organism/modals/view-employee-modal";
import { useOptimistic, useState } from "react";

export default function EmployeeClient({
	employees,
}: { employees: Employee[] }) {
	const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
	const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
	const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const [optimisticEmployees, dispatch] = useOptimistic<
		Employee[],
		{ employee: Employee; action: string }
	>(employees, (state, { employee, action }) => {
		switch (action) {
			case "delete":
				return state.filter(({ id }) => id !== employee.id);
			case "update":
				return state.map((e) => (e.id === employee.id ? employee : e));
			default:
				return [...state, employee];
		}
	});

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
					{optimisticEmployees.map((employee) => (
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
					onClose={() => {
						dispatch({ employee: editEmployee, action: "update" });
						setEditEmployee(null);
					}}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{deleteEmployee && (
				<ConfirmDeleteModal
					open={!!deleteEmployee}
					onClose={() => setDeleteEmployee(null)}
					onConfirm={() => {
						dispatch({ employee: deleteEmployee, action: "delete" });
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
					dispatch({
						employee: {
							id: 1,
							name: employee.name,
							position: employee.position,
							department: employee.department,
							email: employee.email,
							phone: employee.phone,
							startDate: employee.startDate,
						},
						action: "create",
					});
					setCreateModalOpen(false);
				}}
			/>
		</>
	);
}
