import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Zod schema to validate request body
const schema = z.object({
	id: z.number().int(),
});

export async function DELETE(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const parse = schema.safeParse(body);

		if (!parse.success) {
			return NextResponse.json(
				{ error: parse.error.flatten() },
				{ status: 400 },
			);
		}

		const { id } = parse.data;

		// Find the employee by ID
		const employees = await db
			.select()
			.from(employee)
			.where(eq(employee.id, id));
		const selectedEmployee = employees[0];

		if (!selectedEmployee) {
			return NextResponse.json(
				{ error: "Employee not found" },
				{ status: 404 },
			);
		}

		// Ensure the employee belongs to the authenticated user
		if (selectedEmployee.userId !== session.user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Perform delete
		const deletedEmployee = await db
			.delete(employee)
			.where(eq(employee.id, id))
			.returning();

		return NextResponse.json(deletedEmployee[0], { status: 200 });
	} catch (error) {
		console.error("[DELETE_EMPLOYEE]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
