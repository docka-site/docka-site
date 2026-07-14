import { Router, type IRouter } from "express";
import { db, quotesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateQuoteBody, GetQuoteParams, GetQuoteResponse, ListQuotesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/quotes", async (req, res): Promise<void> => {
  const parsed = CreateQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_request", message: parsed.error.message });
    return;
  }

  const [quote] = await db
    .insert(quotesTable)
    .values({
      nome: parsed.data.nome,
      telefone: parsed.data.telefone,
      cnpj: parsed.data.cnpj,
      email: parsed.data.email,
      atividadeProfissional: parsed.data.atividadeProfissional,
      tipoSeguro: parsed.data.tipoSeguro,
      faturamentoAnual: String(parsed.data.faturamentoAnual),
      dataInicioOperacoes: parsed.data.dataInicioOperacoes instanceof Date
        ? parsed.data.dataInicioOperacoes.toISOString().split("T")[0]
        : String(parsed.data.dataInicioOperacoes),
      distribuicaoGeografica: parsed.data.distribuicaoGeografica,
      qtdAcoes: parsed.data.qtdAcoes,
      valorAcoes: String(parsed.data.valorAcoes),
      qtdSinistro: parsed.data.qtdSinistro,
      valorSinistro: String(parsed.data.valorSinistro),
      politicasRh: parsed.data.politicasRh,
    })
    .returning();

  res.status(201).json(GetQuoteResponse.parse({
    ...quote,
    faturamentoAnual: Number(quote.faturamentoAnual),
    valorAcoes: Number(quote.valorAcoes),
    valorSinistro: Number(quote.valorSinistro),
  }));
});

router.get("/quotes", async (_req, res): Promise<void> => {
  const quotes = await db
    .select()
    .from(quotesTable)
    .orderBy(quotesTable.createdAt);

  const parsed = quotes.map((q) => ({
    ...q,
    faturamentoAnual: Number(q.faturamentoAnual),
    valorAcoes: Number(q.valorAcoes),
    valorSinistro: Number(q.valorSinistro),
  }));

  res.json(ListQuotesResponse.parse({ quotes: parsed, total: parsed.length }));
});

router.get("/quotes/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetQuoteParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "invalid_params", message: params.error.message });
    return;
  }

  const [quote] = await db
    .select()
    .from(quotesTable)
    .where(eq(quotesTable.id, params.data.id));

  if (!quote) {
    res.status(404).json({ error: "not_found", message: "Cotação não encontrada" });
    return;
  }

  res.json(GetQuoteResponse.parse({
    ...quote,
    faturamentoAnual: Number(quote.faturamentoAnual),
    valorAcoes: Number(quote.valorAcoes),
    valorSinistro: Number(quote.valorSinistro),
  }));
});

export default router;
