import { Router } from "express";
import { eq, desc, count, gte, and, sql } from "drizzle-orm";
import {
  db,
  adminUsersTable,
  policyholdersTable,
  productsTable,
  policiesTable,
  clientAccountsTable,
  leadsTable,
  quotesTable,
} from "@workspace/db";
import { requireAdmin, hashPassword } from "./admin-auth";
import type { Request } from "express";

const router = Router();

type AdminRequest = Request & {
  adminUser: { id: number; email: string; name: string };
};

// Apply auth middleware to all routes in this router
router.use(requireAdmin);

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

router.get("/admin/stats", async (req, res): Promise<void> => {
  const period = (req.query.period as string) || "30d";

  const periodDays: Record<string, number> = {
    "1d": 1,
    "7d": 7,
    "30d": 30,
    "3m": 90,
    "6m": 180,
    "12m": 365,
  };
  const days = periodDays[period] ?? 30;
  const since = new Date();
  since.setDate(since.getDate() - days);

  const prevSince = new Date(since);
  prevSince.setDate(prevSince.getDate() - days);

  const [
    [{ totalLeads }],
    [{ totalQuotes }],
    [{ totalClients }],
    [{ totalPolicies }],
    [{ activeProducts }],
    [{ periodLeads }],
    [{ periodQuotes }],
    [{ periodClients }],
    [{ periodPolicies }],
    [{ periodProducts }],
    [{ prevLeads }],
    [{ prevQuotes }],
    [{ prevClients }],
    [{ prevPolicies }],
    [{ prevProducts }],
  ] = await Promise.all([
    db.select({ totalLeads: count() }).from(leadsTable),
    db.select({ totalQuotes: count() }).from(quotesTable),
    db.select({ totalClients: count() }).from(policyholdersTable),
    db.select({ totalPolicies: count() }).from(policiesTable),
    db.select({ activeProducts: count() }).from(productsTable).where(eq(productsTable.active, true)),
    db.select({ periodLeads: count() }).from(leadsTable).where(gte(leadsTable.createdAt, since)),
    db.select({ periodQuotes: count() }).from(quotesTable).where(gte(quotesTable.createdAt, since)),
    db.select({ periodClients: count() }).from(policyholdersTable).where(gte(policyholdersTable.createdAt, since)),
    db.select({ periodPolicies: count() }).from(policiesTable).where(gte(policiesTable.createdAt, since)),
    db.select({ periodProducts: count() }).from(productsTable).where(and(eq(productsTable.active, true), gte(productsTable.createdAt, since))),
    db.select({ prevLeads: count() }).from(leadsTable).where(and(gte(leadsTable.createdAt, prevSince), sql`${leadsTable.createdAt} < ${since}`)),
    db.select({ prevQuotes: count() }).from(quotesTable).where(and(gte(quotesTable.createdAt, prevSince), sql`${quotesTable.createdAt} < ${since}`)),
    db.select({ prevClients: count() }).from(policyholdersTable).where(and(gte(policyholdersTable.createdAt, prevSince), sql`${policyholdersTable.createdAt} < ${since}`)),
    db.select({ prevPolicies: count() }).from(policiesTable).where(and(gte(policiesTable.createdAt, prevSince), sql`${policiesTable.createdAt} < ${since}`)),
    db.select({ prevProducts: count() }).from(productsTable).where(and(eq(productsTable.active, true), gte(productsTable.createdAt, prevSince), sql`${productsTable.createdAt} < ${since}`)),
  ]);

  const truncExpr = days <= 30 ? sql`'day'` : days <= 90 ? sql`'week'` : sql`'month'`;

  const leadTimeseries = await db
    .select({
      date: sql<string>`date_trunc(${truncExpr}, ${leadsTable.createdAt})::date`.as("date"),
      count: count(),
    })
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, since))
    .groupBy(sql`date_trunc(${truncExpr}, ${leadsTable.createdAt})::date`)
    .orderBy(sql`date_trunc(${truncExpr}, ${leadsTable.createdAt})::date`);

  const quoteTimeseries = await db
    .select({
      date: sql<string>`date_trunc(${truncExpr}, ${quotesTable.createdAt})::date`.as("date"),
      count: count(),
    })
    .from(quotesTable)
    .where(gte(quotesTable.createdAt, since))
    .groupBy(sql`date_trunc(${truncExpr}, ${quotesTable.createdAt})::date`)
    .orderBy(sql`date_trunc(${truncExpr}, ${quotesTable.createdAt})::date`);

  const recentActivity: Array<{
    type: string;
    label: string;
    detail: string;
    createdAt: Date;
  }> = [];

  const recentLeads = await db
    .select({ email: leadsTable.email, createdAt: leadsTable.createdAt })
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt))
    .limit(5);
  for (const l of recentLeads) {
    recentActivity.push({ type: "lead", label: l.email, detail: "Novo lead", createdAt: l.createdAt });
  }

  const recentQuotes = await db
    .select({ nome: quotesTable.nome, email: quotesTable.email, createdAt: quotesTable.createdAt })
    .from(quotesTable)
    .orderBy(desc(quotesTable.createdAt))
    .limit(5);
  for (const q of recentQuotes) {
    recentActivity.push({ type: "quote", label: q.nome, detail: q.email, createdAt: q.createdAt });
  }

  const recentClients = await db
    .select({ name: policyholdersTable.name, email: policyholdersTable.email, createdAt: policyholdersTable.createdAt })
    .from(policyholdersTable)
    .orderBy(desc(policyholdersTable.createdAt))
    .limit(5);
  for (const c of recentClients) {
    recentActivity.push({ type: "client", label: c.name, detail: c.email, createdAt: c.createdAt });
  }

  recentActivity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json({
    totals: {
      leads: Number(totalLeads),
      quotes: Number(totalQuotes),
      clients: Number(totalClients),
      policies: Number(totalPolicies),
      activeProducts: Number(activeProducts),
    },
    period: {
      leads: Number(periodLeads),
      quotes: Number(periodQuotes),
      clients: Number(periodClients),
      policies: Number(periodPolicies),
      activeProducts: Number(periodProducts),
    },
    previous: {
      leads: Number(prevLeads),
      quotes: Number(prevQuotes),
      clients: Number(prevClients),
      policies: Number(prevPolicies),
      activeProducts: Number(prevProducts),
    },
    leadTimeseries: leadTimeseries.map((r) => ({ date: r.date, count: Number(r.count) })),
    quoteTimeseries: quoteTimeseries.map((r) => ({ date: r.date, count: Number(r.count) })),
    funnel: {
      leads: Number(periodLeads),
      quotes: Number(periodQuotes),
      clients: Number(periodClients),
    },
    recentActivity: recentActivity.slice(0, 10),
  });
});

// ---------------------------------------------------------------------------
// Policyholders (Clientes)
// ---------------------------------------------------------------------------

router.get("/admin/policyholders", async (_req, res): Promise<void> => {
  const list = await db
    .select()
    .from(policyholdersTable)
    .orderBy(desc(policyholdersTable.createdAt));
  res.json({ policyholders: list });
});

router.post("/admin/policyholders", async (req, res): Promise<void> => {
  const { name, email, phone, cnpj, notes } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    cnpj?: string;
    notes?: string;
  };
  if (!name || !email || !phone || !cnpj) {
    res.status(400).json({ error: "invalid_request", message: "name, email, phone e cnpj são obrigatórios" });
    return;
  }
  const [ph] = await db
    .insert(policyholdersTable)
    .values({ name, email, phone, cnpj, notes })
    .returning();
  res.status(201).json({ policyholder: ph });
});

router.get("/admin/policyholders/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }

  const [ph] = await db.select().from(policyholdersTable).where(eq(policyholdersTable.id, id));
  if (!ph) { res.status(404).json({ error: "not_found" }); return; }

  const policies = await db
    .select({
      policy: policiesTable,
      product: { id: productsTable.id, name: productsTable.name },
    })
    .from(policiesTable)
    .leftJoin(productsTable, eq(policiesTable.productId, productsTable.id))
    .where(eq(policiesTable.policyholderId, id))
    .orderBy(desc(policiesTable.createdAt));

  res.json({ policyholder: ph, policies });
});

router.put("/admin/policyholders/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }

  const { name, email, phone, cnpj, status, notes } = req.body as {
    name?: string; email?: string; phone?: string; cnpj?: string;
    status?: "ativo" | "inativo"; notes?: string;
  };

  const [updated] = await db
    .update(policyholdersTable)
    .set({ ...(name && { name }), ...(email && { email }), ...(phone && { phone }),
           ...(cnpj && { cnpj }), ...(status && { status }), ...(notes !== undefined && { notes }) })
    .where(eq(policyholdersTable.id, id))
    .returning();

  if (!updated) { res.status(404).json({ error: "not_found" }); return; }
  res.json({ policyholder: updated });
});

router.delete("/admin/policyholders/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }
  await db.delete(policyholdersTable).where(eq(policyholdersTable.id, id));
  res.status(204).send();
});

router.post("/admin/policyholders/:id/set-temp-password", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }

  const [ph] = await db.select().from(policyholdersTable).where(eq(policyholdersTable.id, id));
  if (!ph) { res.status(404).json({ error: "not_found", message: "Cliente não encontrado" }); return; }

  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const plainPassword = `${seg(4)}-${seg(4)}-${seg(4)}`;

  const passwordHash = await hashPassword(plainPassword);

  await db
    .insert(clientAccountsTable)
    .values({ email: ph.email.toLowerCase().trim(), passwordHash, isTempPassword: false })
    .onConflictDoUpdate({
      target: clientAccountsTable.email,
      set: { passwordHash, isTempPassword: false },
    });

  res.json({ password: plainPassword, email: ph.email });
});

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

router.get("/admin/products", async (_req, res): Promise<void> => {
  const list = await db.select().from(productsTable).orderBy(productsTable.name);
  res.json({ products: list });
});

router.post("/admin/products", async (req, res): Promise<void> => {
  const { name, description, category } = req.body as {
    name?: string; description?: string; category?: string;
  };
  if (!name) { res.status(400).json({ error: "invalid_request", message: "name é obrigatório" }); return; }
  const [product] = await db
    .insert(productsTable)
    .values({ name, description, category })
    .returning();
  res.status(201).json({ product });
});

router.put("/admin/products/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }
  const { name, description, category, active } = req.body as {
    name?: string; description?: string; category?: string; active?: boolean;
  };
  const [updated] = await db
    .update(productsTable)
    .set({ ...(name && { name }), ...(description !== undefined && { description }),
           ...(category !== undefined && { category }), ...(active !== undefined && { active }) })
    .where(eq(productsTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "not_found" }); return; }
  res.json({ product: updated });
});

router.delete("/admin/products/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }
  await db.delete(productsTable).where(eq(productsTable.id, id));
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Policies (Apólices)
// ---------------------------------------------------------------------------

router.get("/admin/policies", async (req, res): Promise<void> => {
  const { policyholderId } = req.query as { policyholderId?: string };
  const baseQuery = db
    .select({
      id: policiesTable.id,
      policyNumber: policiesTable.policyNumber,
      fileName: policiesTable.fileName,
      fileUrl: policiesTable.fileUrl,
      status: policiesTable.status,
      startDate: policiesTable.startDate,
      endDate: policiesTable.endDate,
      createdAt: policiesTable.createdAt,
      policyholderId: policiesTable.policyholderId,
      productId: policiesTable.productId,
      policyholderName: policyholdersTable.name,
      productName: productsTable.name,
    })
    .from(policiesTable)
    .leftJoin(policyholdersTable, eq(policiesTable.policyholderId, policyholdersTable.id))
    .leftJoin(productsTable, eq(policiesTable.productId, productsTable.id))
    .orderBy(desc(policiesTable.createdAt));

  const list = policyholderId
    ? await baseQuery.where(eq(policiesTable.policyholderId, Number(policyholderId)))
    : await baseQuery;

  res.json({ policies: list });
});

router.post("/admin/policies", async (req, res): Promise<void> => {
  const { policyholderId, productId, policyNumber, fileName, fileUrl, startDate, endDate, status } =
    req.body as {
      policyholderId?: number; productId?: number; policyNumber?: string;
      fileName?: string; fileUrl?: string; startDate?: string; endDate?: string;
      status?: "ativa" | "vencida" | "cancelada" | "pendente";
    };

  if (!policyholderId) {
    res.status(400).json({ error: "invalid_request", message: "policyholderId é obrigatório" });
    return;
  }

  const [policy] = await db
    .insert(policiesTable)
    .values({
      policyholderId,
      ...(productId && { productId }),
      ...(policyNumber && { policyNumber }),
      ...(fileName && { fileName }),
      ...(fileUrl && { fileUrl }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(status && { status }),
    })
    .returning();

  res.status(201).json({ policy });
});

router.put("/admin/policies/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }

  const { productId, policyNumber, fileName, fileUrl, startDate, endDate, status } = req.body as {
    productId?: number; policyNumber?: string; fileName?: string;
    fileUrl?: string; startDate?: string; endDate?: string;
    status?: "ativa" | "vencida" | "cancelada" | "pendente";
  };

  const [updated] = await db
    .update(policiesTable)
    .set({
      ...(productId !== undefined && { productId }),
      ...(policyNumber !== undefined && { policyNumber }),
      ...(fileName !== undefined && { fileName }),
      ...(fileUrl !== undefined && { fileUrl }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
      ...(status && { status }),
    })
    .where(eq(policiesTable.id, id))
    .returning();

  if (!updated) { res.status(404).json({ error: "not_found" }); return; }
  res.json({ policy: updated });
});

router.delete("/admin/policies/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }
  await db.delete(policiesTable).where(eq(policiesTable.id, id));
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Admin Users management
// ---------------------------------------------------------------------------

router.get("/admin/users", async (_req, res): Promise<void> => {
  const users = await db
    .select({
      id: adminUsersTable.id,
      email: adminUsersTable.email,
      name: adminUsersTable.name,
      active: adminUsersTable.active,
      createdAt: adminUsersTable.createdAt,
    })
    .from(adminUsersTable)
    .orderBy(adminUsersTable.name);
  res.json({ users });
});

router.post("/admin/users", async (req, res): Promise<void> => {
  const { name, email, password } = req.body as {
    name?: string; email?: string; password?: string;
  };
  if (!name || !email || !password) {
    res.status(400).json({ error: "invalid_request", message: "name, email e password são obrigatórios" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "invalid_request", message: "Senha deve ter no mínimo 8 caracteres" });
    return;
  }
  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(adminUsersTable)
    .values({ name, email, passwordHash })
    .returning({ id: adminUsersTable.id, email: adminUsersTable.email, name: adminUsersTable.name, active: adminUsersTable.active, createdAt: adminUsersTable.createdAt });
  res.status(201).json({ user });
});

router.put("/admin/users/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "invalid_id" }); return; }
  const { name, active } = req.body as { name?: string; active?: boolean };
  const [updated] = await db
    .update(adminUsersTable)
    .set({ ...(name && { name }), ...(active !== undefined && { active }) })
    .where(eq(adminUsersTable.id, id))
    .returning({ id: adminUsersTable.id, email: adminUsersTable.email, name: adminUsersTable.name, active: adminUsersTable.active, createdAt: adminUsersTable.createdAt });
  if (!updated) { res.status(404).json({ error: "not_found" }); return; }
  res.json({ user: updated });
});

export default router;
