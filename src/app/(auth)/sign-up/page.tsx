import Link from "next/link";
import Register from "../_components/Register";

export default function page() {
	return (
		<div className="m-1">
			<Register />
			<Link href="/sign-in">Have an account? Signin</Link>
		</div>
	);
}
