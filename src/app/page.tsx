import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "./_components/Logout";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return redirect("/sign-in");
	}

	return (
		<div>
			<h1>Welcome {session.user.name}</h1>
			<Logout />
		</div>
	);
}
