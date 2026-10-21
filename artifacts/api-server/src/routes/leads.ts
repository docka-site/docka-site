import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const HUBSPOT_CONTACT_FIELDS = [
  "firstname",
  "lastname",
  "phone",
  "company",
  "jobtitle",
  "segmento",
  "faturamento",
  "contrato_exige_seguro",
  "comentarios",
] as const;

router.post("/leads/contact", async (req, res): Promise<void> => {
  const body = req.body ?? {};
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "invalid_request", message: "E-mail inválido" });
    return;
  }

  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    logger.error("HUBSPOT_API_KEY não configurada");
    res.status(500).json({ error: "not_configured" });
    return;
  }

  const properties: Record<string, string> = { email };
  for (const field of HUBSPOT_CONTACT_FIELDS) {
    const value = body[field];
    if (typeof value === "string" && value.trim() !== "") {
      properties[field] = value.trim();
    }
  }

  const hubspotRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: [{ id: email, idProperty: "email", properties }] }),
  });

  if (!hubspotRes.ok) {
    logger.error({ status: hubspotRes.status, detail: await hubspotRes.text() }, "Falha ao enviar lead ao HubSpot");
    res.status(502).json({ error: "hubspot_error" });
    return;
  }

  await db
    .insert(leadsTable)
    .values({ email })
    .onConflictDoNothing({ target: leadsTable.email });

  res.status(201).json({ ok: true });
});

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
