import { NextResponse } from "next/server";
import { z } from "zod";
import validator from "validator";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const schema = z.object({
	id: z.number().int(),
	name: z.string().min(2).max(100).optional(),
	position: z.string().min(2).max(100).optional(),
	department: z.string().min(1).max(100).optional(),
	email: z.string().email().max(255).optional(),
	phone: z
		.string()
		.refine((val) => validator.isMobilePhone(val, "any"), {
			message: "Invalid phone number format",
		})
		.optional(),
	startDate: z
		.string()
		.refine((val) => !Number.isNaN(Date.parse(val)), {
			message: "Invalid date format",
		})
		.refine((val) => new Date(val) <= new Date(), {
			message: "Start date cannot be in the future",
		})
		.optional(),
});

export async function PUT(req: Request) {
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

		const { id, name, position, department, email, phone, startDate } =
			parse.data;

		// Fetch and validate ownership
		const result = await db.select().from(employee).where(eq(employee.id, id));

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
			.where(eq(employee.id, id))
			.returning();

		return NextResponse.json(updated[0], { status: 200 });
	} catch (error) {
		console.error("[EDIT_EMPLOYEE]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
