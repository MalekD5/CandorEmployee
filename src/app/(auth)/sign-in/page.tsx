import Link from "next/link";
import Login from "../_components/Login";

export default function page() {
	return (
		<div className="m-1">
			<Login />
			<Link href="/sign-up">No account? Signup</Link>
		</div>
	);
}
