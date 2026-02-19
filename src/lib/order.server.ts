import { getDb } from "@/db";
import { order } from "@/db/schema/schema";
import { createServerFn } from "@tanstack/react-start";
import { ensureSession } from "./auth.server";

export const createOrder = createServerFn({ method: "POST" })
    .inputValidator((data: { status: string }) => data)
    .handler(async ({ data }) => {
        const session = await ensureSession();
        const db = await getDb();
        const result = await db.insert(order).values({
            status: data.status,
            userId: session.user.id,
        });
        return result;
    });