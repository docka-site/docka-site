// Resend integration via Replit Connectors
// WARNING: Never cache this client — tokens expire on each request.
import { Resend } from "resend";

let _connectionSettings: { settings: { api_key: string; from_email?: string } } | undefined;

async function getCredentials(): Promise<{ apiKey: string; fromEmail: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (hostname && xReplitToken) {
    try {
      const data = await fetch(
        `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=resend`,
        {
          headers: {
            Accept: "application/json",
            "X-Replit-Token": xReplitToken,
          },
        }
      ).then((r) => r.json());

      _connectionSettings = (data as { items?: typeof _connectionSettings[] }).items?.[0];
    } catch {
      // fall through to env var fallback
    }
  }

  const apiKey =
    _connectionSettings?.settings?.api_key ?? process.env.RESEND_API_KEY;
  const fromEmail =
    _connectionSettings?.settings?.from_email ??
    process.env.RESEND_FROM_EMAIL ??
    "Docka Seguros <onboarding@resend.dev>";

  if (!apiKey) throw new Error("Resend not configured");
  return { apiKey, fromEmail };
}

export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return { client: new Resend(apiKey), fromEmail };
}
