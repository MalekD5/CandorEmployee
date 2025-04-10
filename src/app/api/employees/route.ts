import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const employees = await db
			.select()
			.from(employee)
			.where(eq(employee.userId, session.user.id));

		return NextResponse.json(employees, { status: 200 });
	} catch (error) {
		console.error("[EMPLOYEE_LIST_ERROR]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
