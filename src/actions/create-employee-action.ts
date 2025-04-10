"use server";

import { z } from "zod";
import { authMiddleware } from "./auth-middleware";

import validator from "validator";
import { db } from "@/db/drizzle";
import { employee } from "@/db/schema";

const schema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(100, "Name must be less than 100 characters"),
	position: z
		.string()
		.min(2, "Position must be at least 2 characters long")
		.max(100, "Position must be less than 100 characters"),
	department: z
		.string()
		.min(1, "Department must be provided")
		.max(100, "Department must be less than 100 characters"),
	email: z
		.string()
		.email("Invalid email format")
		.max(255, "Email must be less than 255 characters"),
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
		}),
});

export type EmployeeInput = z.infer<typeof schema>;

export const createEmployeeAction = authMiddleware
	.createServerAction()
	.input(schema)
	.handler(async ({ input, ctx }) => {
		const user = ctx.user;

		if (!user) {
			throw new Error("Unauthorized");
		}

		const { name, position, department, email, phone, startDate } = input;

		const createdEmployee = await db
			.insert(employee)
			.values({
				name,
				position,
				department,
				phone,
				email,
				startDate: new Date(startDate),
				userId: user.id,
			})
			.returning();

		return createdEmployee;
	});
