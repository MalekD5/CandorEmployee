import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const employee = pgTable("employee", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	position: text("position").notNull(),
	department: text("department").notNull(),
	email: text("email").notNull().unique(),
	phone: text("phone"),
	startDate: timestamp("start_date"),

	// Foreign key to the user (company)
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});
