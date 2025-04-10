import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { createEmployeeSchema } from "@/lib/zod-schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user)
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const body = await req.json();
		const parse = createEmployeeSchema.safeParse(body);

		if (!parse.success) {
			return NextResponse.json(
				{ error: parse.error.flatten() },
				{ status: 400 },
			);
		}

		const { name, position, department, email, phone, startDate } = parse.data;

		const createdEmployee = await db
			.insert(employee)
			.values({
				name,
				position,
				department,
				email,
				phone,
				startDate: new Date(startDate),
				userId: session.user.id,
			})
			.returning();

		return NextResponse.json(createdEmployee[0], { status: 201 });
	} catch (error) {
		console.error("[CREATE_EMPLOYEE]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
