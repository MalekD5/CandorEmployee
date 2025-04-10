import { z } from "zod";

import validator from "validator";

export const createEmployeeSchema = z.object({
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

export const updateEmployeeSchema = z.object({
	id: z.string(),
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
