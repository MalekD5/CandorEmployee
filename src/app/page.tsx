import Link from "next/link";
import Login from "./_components/Login";
import Register from "./_components/Register";

export default async function Home() {
	return (
		<div className="m-1">
			<Login />

			<Register />

			<Link href="/dashboard">Dashboard</Link>
		</div>
	);
}
