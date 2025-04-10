import Sidebar from "@/components/organism/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return redirect("/sign-in");
	}

	return (
		<div className=" flex min-h-screen flex-col bg-background text-foreground md:flex-row">
			<Sidebar />
			<main className="flex flex-1 flex-col bg-foreground">{children}</main>
		</div>
	);
}
