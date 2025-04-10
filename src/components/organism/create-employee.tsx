import { Plus } from "lucide-react";
import { Card } from "../atom/card";

type CreateEmployeeCardProps = {
	setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateEmployeeCard({
	setCreateModalOpen,
}: CreateEmployeeCardProps) {
	return (
		<Card
			className="flex flex-col cursor-pointer border-2 border-dashed border-primary/50 hover:!bg-white transition-colors !bg-transparent active:translate-y-1"
			onClick={() => setCreateModalOpen(true)}
		>
			<div className="flex flex-1 flex-col items-center justify-center p-6">
				<div className="rounded-full bg-primary/10 p-3 mb-3">
					<Plus className="h-8 w-8 text-primary" />
				</div>
				<h3 className="text-xl font-medium mb-1">Create Employee</h3>
				<p className="text-sm text-muted-foreground text-center">
					Add a new employee to your organization
				</p>
			</div>
		</Card>
	);
}
