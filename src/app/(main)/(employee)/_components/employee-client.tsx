"use client";

import UnifiedInput from "@/components/atom/unified-input";
import CreateEmployeeCard from "@/components/organism/create-employee";
import Employee from "@/components/organism/employee";
import { CreateEmployeeModal } from "@/components/organism/modals/create-employee-modal";
import { ConfirmDeleteModal } from "@/components/organism/modals/delete-employee-modal";
import { EditEmployeeModal } from "@/components/organism/modals/edit-employee-modal";
import { ViewEmployeeModal } from "@/components/organism/modals/view-employee-modal";
import EmployeeSkeleton from "@/components/organism/skeleton-employee";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { startTransition, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function EmployeeClient() {
	const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
	const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
	const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	const query = useQuery({
		queryKey: ["employees"],
		queryFn: async () => {
			const response = await fetch("/api/employees");
			const data = await response.json();
			return data as Employee[];
		},
	});

	const employees = query.data ?? [];

	return (
		<>
			<div className="flex items-center mb-6 gap-0.5 md:gap-2 mt-12 md:mt-0">
				<div className="flex-1">
					<div className="relative">
						<UnifiedInput
							className="p-2 text-lg"
							search
							placeholder="Enter Employee name or Department"
							onChange={(value) => setSearch(value.target.value)}
							iconPosition="left"
						/>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<CreateEmployeeCard setCreateModalOpen={setCreateModalOpen} />
					{query.isLoading && <EmployeeSkeleton />}
					{search === ""
						? employees.map((employee) =>
								employee.id === -1 ? (
									<EmployeeSkeleton key={employee.id} />
								) : (
									<Employee
										key={employee.id}
										employee={employee}
										setViewEmployee={setViewEmployee}
										setEditEmployee={setEditEmployee}
										setDeleteEmployee={setDeleteEmployee}
									/>
								),
							)
						: employees
								.filter(
									(employee) =>
										employee.name
											.toLowerCase()
											.includes(search.toLowerCase()) ||
										employee.department
											.toLowerCase()
											.includes(search.toLowerCase()),
								)
								.map((employee) =>
									employee.id === -1 ? (
										<EmployeeSkeleton key={employee.id} />
									) : (
										<Employee
											key={employee.id}
											employee={employee}
											setViewEmployee={setViewEmployee}
											setEditEmployee={setEditEmployee}
											setDeleteEmployee={setDeleteEmployee}
										/>
									),
								)}
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
						setTimeout(() => setEditEmployee(null), 400);
					}}
					onUpdateEmployee={() => {
						queryClient.invalidateQueries({ queryKey: ["employees"] });
					}}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{deleteEmployee && (
				<ConfirmDeleteModal
					id={deleteEmployee.id}
					open={!!deleteEmployee}
					onClose={() => setDeleteEmployee(null)}
					onConfirm={() => {
						queryClient.invalidateQueries({ queryKey: ["employees"] });
					}}
					title="Delete Employee"
					description={`Are you sure you want to delete ${deleteEmployee.name}? This action cannot be undone.`}
				/>
			)}

			{/* Create Employee Modal */}
			<CreateEmployeeModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onCreateEmployee={() => {
					queryClient.invalidateQueries({ queryKey: ["employees"] });
				}}
			/>

			<ToastContainer />
		</>
	);
}
