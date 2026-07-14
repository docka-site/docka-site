import { Router } from "express";
import { eq, sql } from "drizzle-orm";
import {
  db,
  policyholdersTable,
  policiesTable,
  productsTable,
  quotesTable,
  clientAccountsTable,
} from "@workspace/db";
import { requireClient } from "./portal-auth";
import type { Request } from "express";

const router = Router();

type ClientReq = Request & { clientEmail: string };

// GET /api/portal/me — current client profile + whether password is set
router.get("/portal/me", requireClient, async (req, res): Promise<void> => {
  const email = (req as ClientReq).clientEmail;

  const [account] = await db
    .select()
    .from(clientAccountsTable)
    .where(eq(clientAccountsTable.email, email));

  const [policyholder] = await db
    .select()
    .from(policyholdersTable)
    .where(sql`lower(${policyholdersTable.email}) = lower(${email})`);

  res.json({
    email,
    hasPassword: !!account?.passwordHash,
    hasGoogle: !!account?.googleId,
    policyholder: policyholder ?? null,
  });
});

// GET /api/portal/apolices — client's policies
router.get("/portal/apolices", requireClient, async (req, res): Promise<void> => {
  const email = (req as ClientReq).clientEmail;

  const [policyholder] = await db
    .select()
    .from(policyholdersTable)
    .where(sql`lower(${policyholdersTable.email}) = lower(${email})`);

  if (!policyholder) {
    res.json({ apolices: [] });
    return;
  }

  const policies = await db
    .select({
      id: policiesTable.id,
      policyNumber: policiesTable.policyNumber,
      status: policiesTable.status,
      startDate: policiesTable.startDate,
      endDate: policiesTable.endDate,
      fileUrl: policiesTable.fileUrl,
      fileName: policiesTable.fileName,
      productName: productsTable.name,
      productCategory: productsTable.category,
    })
    .from(policiesTable)
    .leftJoin(productsTable, eq(policiesTable.productId, productsTable.id))
    .where(eq(policiesTable.policyholderId, policyholder.id));

  res.json({ apolices: policies });
});

// GET /api/portal/cotacoes — client's quotes
router.get("/portal/cotacoes", requireClient, async (req, res): Promise<void> => {
  const email = (req as ClientReq).clientEmail;

  const quotes = await db
    .select()
    .from(quotesTable)
    .where(eq(quotesTable.email, email));

  res.json({ cotacoes: quotes });
});

export default router;
