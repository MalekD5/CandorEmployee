import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EmployeeClient from "./_components/employee-client";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return redirect("/sign-in");
	}

	return (
		<div className="container mx-auto flex flex-1 flex-col px-4 pt-4 pb-6">
			<EmployeeClient />
		</div>
	);
}
