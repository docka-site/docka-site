import { Router } from "express";
import { randomBytes } from "crypto";
import { eq, and, gt } from "drizzle-orm";
import {
  db,
  clientSessionsTable,
  clientAccountsTable,
} from "@workspace/db";
import { hashPassword, verifyPassword } from "./admin-auth";
import type { Request, Response, NextFunction } from "express";

const router = Router();

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ---------------------------------------------------------------------------
// Session helpers
// ---------------------------------------------------------------------------

async function createClientSession(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(clientSessionsTable).values({ email, token, expiresAt });
  return token;
}

// ---------------------------------------------------------------------------
// Auth middleware
// ---------------------------------------------------------------------------

export const requireClient = async (
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
    .from(clientSessionsTable)
    .where(
      and(
        eq(clientSessionsTable.token, token),
        gt(clientSessionsTable.expiresAt, new Date())
      )
    );

  if (!session) {
    res.status(401).json({ error: "unauthorized", message: "Sessão expirada ou inválida" });
    return;
  }

  (req as Request & { clientEmail: string }).clientEmail = session.email;
  next();
};

// ---------------------------------------------------------------------------
// Password login
// ---------------------------------------------------------------------------

// POST /api/portal/auth/password — login with email + password
router.post("/portal/auth/password", async (req, res): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: "invalid_request", message: "E-mail e senha são obrigatórios" });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  const [account] = await db
    .select()
    .from(clientAccountsTable)
    .where(eq(clientAccountsTable.email, normalizedEmail));

  if (!account || !account.passwordHash) {
    res.status(401).json({ error: "unauthorized", message: "E-mail ou senha incorretos" });
    return;
  }

  const valid = await verifyPassword(password, account.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "unauthorized", message: "E-mail ou senha incorretos" });
    return;
  }

  const token = await createClientSession(normalizedEmail);
  res.json({ token });
});

// POST /api/portal/auth/password/set — set or change password (requires valid session)
router.post("/portal/auth/password/set", requireClient, async (req, res): Promise<void> => {
  const clientEmail = (req as Request & { clientEmail: string }).clientEmail;
  const { password } = req.body as { password?: string };

  if (!password || password.length < 8) {
    res.status(400).json({ error: "invalid_request", message: "Senha deve ter no mínimo 8 caracteres" });
    return;
  }

  const passwordHash = await hashPassword(password);

  await db
    .insert(clientAccountsTable)
    .values({ email: clientEmail, passwordHash, isTempPassword: false })
    .onConflictDoUpdate({
      target: clientAccountsTable.email,
      set: { passwordHash, isTempPassword: false },
    });

  res.json({ message: "Senha definida com sucesso" });
});

// ---------------------------------------------------------------------------
// Google OAuth routes (kept for future use)
// ---------------------------------------------------------------------------

function getGoogleRedirectUri(req: Request): string {
  const host = req.get("host") ?? "";
  const proto = req.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}/api/portal/auth/google/callback`;
}

router.get("/portal/auth/google/url", (req, res): void => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(503).json({ error: "not_configured", message: "Google OAuth não configurado" });
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGoogleRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
});

router.get("/portal/auth/google/callback", async (req, res): Promise<void> => {
  const { code, error } = req.query as { code?: string; error?: string };

  if (error || !code) {
    res.redirect("/portal?error=google_cancelled");
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.redirect("/portal?error=not_configured");
    return;
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getGoogleRedirectUri(req),
        grant_type: "authorization_code",
      }),
    });

    const tokens = (await tokenRes.json()) as { access_token?: string; error?: string };
    if (!tokens.access_token) {
      res.redirect("/portal?error=google_token_failed");
      return;
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userInfo = (await userRes.json()) as { id?: string; email?: string; name?: string };
    if (!userInfo.email) {
      res.redirect("/portal?error=google_no_email");
      return;
    }

    const normalizedEmail = userInfo.email.toLowerCase();

    await db
      .insert(clientAccountsTable)
      .values({ email: normalizedEmail, googleId: userInfo.id })
      .onConflictDoUpdate({
        target: clientAccountsTable.email,
        set: { googleId: userInfo.id },
      });

    const token = await createClientSession(normalizedEmail);
    res.redirect(`/portal/dashboard?token=${token}`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.redirect("/portal?error=google_failed");
  }
});

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

router.post("/portal/auth/logout", requireClient, async (req, res): Promise<void> => {
  const token = req.headers.authorization!.slice(7);
  await db
    .delete(clientSessionsTable)
    .where(eq(clientSessionsTable.token, token));
  res.status(204).send();
});

export default router;
