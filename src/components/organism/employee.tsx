import { Edit2, Eye, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../atom/avatar";
import Button from "../atom/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../atom/card";

type EmployeeProps = {
	employee: Employee;

	setViewEmployee: (employee: Employee) => void;
	setEditEmployee: (employee: Employee) => void;
	setDeleteEmployee: (employee: Employee) => void;
};

export default function Employee({
	employee,
	setViewEmployee,
	setEditEmployee,
	setDeleteEmployee,
}: EmployeeProps) {
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex items-center gap-4">
					<Avatar className="h-12 w-12">
						<AvatarImage src={employee.avatar} alt={employee.name} />
						<AvatarFallback>
							{employee.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-lg">{employee.name}</CardTitle>
						<CardDescription>{employee.position}</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="grid gap-2 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Department:</span>
						<span>{employee.department}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Email:</span>
						<span className="max-w-[180px] truncate">{employee.email}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between border-t p-4">
				<div className="flex gap-2">
					<Button
						color="outline"
						size="sm"
						onClick={() => setViewEmployee(employee)}
					>
						<Eye className="mr-1 h-4 w-4" />
						View
					</Button>
					<Button
						color="default"
						size="sm"
						onClick={() => setEditEmployee(employee)}
					>
						<Edit2 className="mr-1 h-4 w-4" />
						Edit
					</Button>
					<Button
						color="destructive"
						size="sm"
						className="hover:bg-destructive/10"
						onClick={() => setDeleteEmployee(employee)}
					>
						<Trash2 className="mr-1 h-4 w-4" />
						Delete
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
