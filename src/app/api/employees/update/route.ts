import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateEmployeeSchema } from "@/lib/zod-schemas";

export async function PUT(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const parse = updateEmployeeSchema.safeParse(body);
		if (!parse.success) {
			return NextResponse.json(
				{ error: parse.error.flatten() },
				{ status: 400 },
			);
		}

		const { id, name, position, department, email, phone, startDate } =
			parse.data;

		// Fetch and validate ownership
		const result = await db
			.select()
			.from(employee)
			.where(eq(employee.id, id as unknown as number));

		const selectedEmployee = result[0];
		if (!selectedEmployee) {
			return NextResponse.json(
				{ error: "Employee not found" },
				{ status: 404 },
			);
		}

		if (selectedEmployee.userId !== session.user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const updated = await db
			.update(employee)
			.set({
				name,
				position,
				department,
				email,
				phone,
				startDate: startDate ? new Date(startDate) : undefined,
			})
			.where(eq(employee.id, id as unknown as number));

		return NextResponse.json(selectedEmployee, { status: 200 });
	} catch (error) {
		console.error("[EDIT_EMPLOYEE]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
