import { Card, CardContent, CardFooter, CardHeader } from "../atom/card";

// Skeleton loader component for Employee
export default function EmployeeSkeleton() {
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex items-center gap-4">
					{/* Avatar Skeleton */}
					<div className="h-12 w-12 bg-gray-300 animate-pulse rounded-full" />
					<div className="space-y-2">
						{/* Name Skeleton */}
						<div className="h-4 bg-gray-300 animate-pulse w-32 rounded" />
						{/* Position Skeleton */}
						<div className="h-3 bg-gray-300 animate-pulse w-24 rounded" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="grid gap-2 text-sm">
					{/* Department Skeleton */}
					<div className="flex justify-between">
						<div className="h-3 bg-gray-300 animate-pulse w-32 rounded" />
					</div>
					{/* Email Skeleton */}
					<div className="flex justify-between">
						<div className="h-3 bg-gray-300 animate-pulse w-48 rounded" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between border-t p-4">
				<div className="flex gap-2">
					{/* Buttons Skeleton */}
					<div className="h-8 w-16 bg-gray-300 animate-pulse rounded" />
					<div className="h-8 w-16 bg-gray-300 animate-pulse rounded" />
					<div className="h-8 w-16 bg-gray-300 animate-pulse rounded" />
				</div>
			</CardFooter>
		</Card>
	);
}
