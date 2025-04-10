"use server";

import { z } from "zod";
import { authMiddleware } from "./auth-middleware";

import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { and, eq, like, or } from "drizzle-orm";

const schema = z.object({
	name: z.string(),
	department: z.string().optional(),
});

export type EmployeeInput = z.infer<typeof schema>;

export const searchEmployeesAction = authMiddleware
	.createServerAction()
	.input(schema)
	.handler(async ({ input, ctx }) => {
		const user = ctx.user;

		if (!user) {
			throw new Error("Unauthorized");
		}

		const { name, department } = input;

		const selectedEmployees = await db
			.select()
			.from(employee)
			.where(
				and(
					or(
						like(employee.name, name),
						like(employee.department, department ?? ""),
					),
					eq(employee.userId, user.id),
				),
			);

		return selectedEmployees;
	});
