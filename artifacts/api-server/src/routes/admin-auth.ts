import { Router } from "express";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq, count } from "drizzle-orm";
import {
  db,
  adminUsersTable,
  adminSessionsTable,
} from "@workspace/db";
import type { Request, Response, NextFunction } from "express";

const router = Router();
const scryptAsync = promisify(scrypt);

// ---------------------------------------------------------------------------
// Password helpers
// ---------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const [salt, stored] = hash.split(":");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return key.toString("hex") === stored;
}

// ---------------------------------------------------------------------------
// Auth middleware (exported so admin.ts can use it)
// ---------------------------------------------------------------------------

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "unauthorized", message: "Token ausente" });
    return;
  }
  const token = auth.slice(7);

  const [session] = await db
    .select()
    .from(adminSessionsTable)
    .where(eq(adminSessionsTable.token, token));

  if (!session || session.expiresAt < new Date()) {
    res.status(401).json({ error: "unauthorized", message: "Sessão expirada" });
    return;
  }

  const [admin] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, session.adminUserId));

  if (!admin || !admin.active) {
    res.status(401).json({ error: "unauthorized", message: "Usuário inativo" });
    return;
  }

  (req as Request & { adminUser: { id: number; email: string; name: string } }).adminUser = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };
  next();
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /api/admin/setup — check whether first-admin setup is required
router.get("/admin/setup", async (_req, res): Promise<void> => {
  const [{ adminCount }] = await db
    .select({ adminCount: count() })
    .from(adminUsersTable);
  res.json({ setupRequired: Number(adminCount) === 0 });
});

// POST /api/admin/setup — create the first admin (only when no admins exist)
router.post("/admin/setup", async (req, res): Promise<void> => {
  const [{ adminCount }] = await db
    .select({ adminCount: count() })
    .from(adminUsersTable);
  if (Number(adminCount) > 0) {
    res.status(403).json({ error: "forbidden", message: "Setup já foi concluído" });
    return;
  }

  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
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
  const [admin] = await db
    .insert(adminUsersTable)
    .values({ name, email, passwordHash })
    .returning({ id: adminUsersTable.id, email: adminUsersTable.email, name: adminUsersTable.name });

  res.status(201).json({ admin });
});

// POST /api/admin/login
router.post("/admin/login", async (req, res): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: "invalid_request", message: "email e password são obrigatórios" });
    return;
  }

  const [admin] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email));

  if (!admin || !admin.active) {
    res.status(401).json({ error: "unauthorized", message: "E-mail ou senha incorretos" });
    return;
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "unauthorized", message: "E-mail ou senha incorretos" });
    return;
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours

  await db.insert(adminSessionsTable).values({
    adminUserId: admin.id,
    token,
    expiresAt,
  });

  res.json({
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
});

// POST /api/admin/logout
router.post("/admin/logout", requireAdmin, async (req, res): Promise<void> => {
  const token = req.headers.authorization!.slice(7);
  await db
    .delete(adminSessionsTable)
    .where(eq(adminSessionsTable.token, token));
  res.status(204).send();
});

// GET /api/admin/me
router.get("/admin/me", requireAdmin, async (req, res): Promise<void> => {
  const adminUser = (req as Request & { adminUser: { id: number; email: string; name: string } }).adminUser;
  res.json({ admin: adminUser });
});

export default router;
