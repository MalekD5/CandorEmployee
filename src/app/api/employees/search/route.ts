import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq, like, or, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(req.url);
		const name = searchParams.get("name") ?? "";
		const department = searchParams.get("department") ?? "";

		if (!name) {
			return NextResponse.json(
				{ error: "Name query parameter is required" },
				{ status: 400 },
			);
		}

		const results = await db
			.select()
			.from(employee)
			.where(
				and(
					or(
						like(employee.name, `%${name}%`),
						department
							? like(employee.department, `%${department}%`)
							: undefined,
					),
					eq(employee.userId, session.user.id),
				),
			);

		return NextResponse.json(results, { status: 200 });
	} catch (error) {
		console.error("[EMPLOYEE_SEARCH_ERROR]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
