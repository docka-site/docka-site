import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_request", message: parsed.error.message });
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values({ email: parsed.data.email })
    .onConflictDoUpdate({
      target: leadsTable.email,
      set: { email: sql`excluded.email` },
    })
    .returning();

  res.status(201).json({
    id: lead.id,
    email: lead.email,
    createdAt: lead.createdAt,
  });
});

export default router;
