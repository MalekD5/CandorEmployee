"use server";

import { z } from "zod";
import { authMiddleware } from "./auth-middleware";

import validator from "validator";
import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";
import { eq } from "drizzle-orm";

const schema = z.object({
	id: z.number().int(),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(100, "Name must be less than 100 characters")
		.optional(),
	position: z
		.string()
		.min(2, "Position must be at least 2 characters long")
		.max(100, "Position must be less than 100 characters")
		.optional(),
	department: z
		.string()
		.min(1, "Department must be provided")
		.max(100, "Department must be less than 100 characters")
		.optional(),
	email: z
		.string()
		.email("Invalid email format")
		.max(255, "Email must be less than 255 characters")
		.optional(),
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

export type EmployeeInput = z.infer<typeof schema>;

export const editEmployeeAction = authMiddleware
	.createServerAction()
	.input(schema)
	.handler(async ({ input, ctx }) => {
		const user = ctx.user;

		if (!user) {
			throw new Error("Unauthorized");
		}

		const { id, name, position, department, email, phone, startDate } = input;

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

		const updatedEmployee = await db
			.update(employee)
			.set({
				name,
				position,
				department,
				phone,
				email,
				startDate: startDate ? new Date(startDate) : undefined,
			})
			.returning();

		return updatedEmployee;
	});
