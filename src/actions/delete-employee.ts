"use server";

import { z } from "zod";
import { authMiddleware } from "./auth-middleware";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";

const schema = z.object({
	id: z.number().int(),
});

export type EmployeeInput = z.infer<typeof schema>;

export const editEmployeeAction = authMiddleware
	.createServerAction()
	.input(schema)
	.handler(async ({ input, ctx }) => {
		const user = ctx.user;

		if (!user) {
			throw new Error("Unauthorized");
		}

		const { id } = input;

		const selectedEmployees = await db
			.select()
			.from(employee)
			.where(eq(employee.id, id));

		if (selectedEmployees.length === 0) {
			throw new Error("Employee not found");
		}

		const selectedEmployee = selectedEmployees[0];

		if (selectedEmployee.userId !== user.id) {
			throw new Error("Unauthorized");
		}

		const deletedEmployee = await db
			.delete(employee)
			.where(eq(employee.id, id))
			.returning();

		return deletedEmployee;
	});
