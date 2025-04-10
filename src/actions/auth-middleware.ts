"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createServerActionProcedure } from "zsa";

export const authMiddleware = createServerActionProcedure().handler(
	async () => {
		try {
			const session = await auth.api.getSession({
				headers: await headers(),
			});

			if (!session || !session.user) {
				throw new Error("Unauthorized");
			}

			return {
				user: session.user,
			};
		} catch {
			throw new Error("Unauthorized");
		}
	},
);
