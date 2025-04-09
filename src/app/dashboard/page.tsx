import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import Logout from "./Logout";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return <div>Not authenticated</div>;
	}
	return (
		<div>
			<h1>Welcome {session.user.name}</h1>
			<Logout />
		</div>
	);
}
