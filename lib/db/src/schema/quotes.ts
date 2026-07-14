import { pgTable, serial, text, numeric, integer, boolean, date, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const atividadeProfissionalEnum = pgEnum("atividade_profissional", [
  "advogado",
  "arquiteto",
  "dentista",
  "emp_tecnologia",
  "contador",
  "medico",
  "outras_atividades",
]);

export const tipoSeguroEnum = pgEnum("tipo_seguro", ["novo", "renovacao"]);

export const distribuicaoGeograficaEnum = pgEnum("distribuicao_geografica", [
  "local",
  "nacional",
  "internacional",
]);

export const quoteStatusEnum = pgEnum("quote_status", [
  "pendente",
  "ativo",
  "cancelado",
]);

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotesTable = pgTable("quotes", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  telefone: text("telefone").notNull(),
  cnpj: text("cnpj").notNull(),
  email: text("email").notNull(),
  atividadeProfissional: atividadeProfissionalEnum("atividade_profissional").notNull(),
  tipoSeguro: tipoSeguroEnum("tipo_seguro").notNull(),
  faturamentoAnual: numeric("faturamento_anual", { precision: 15, scale: 2 }).notNull(),
  dataInicioOperacoes: date("data_inicio_operacoes").notNull(),
  distribuicaoGeografica: distribuicaoGeograficaEnum("distribuicao_geografica").notNull(),
  qtdAcoes: integer("qtd_acoes").notNull().default(0),
  valorAcoes: numeric("valor_acoes", { precision: 15, scale: 2 }).notNull().default("0"),
  qtdSinistro: integer("qtd_sinistro").notNull().default(0),
  valorSinistro: numeric("valor_sinistro", { precision: 15, scale: 2 }).notNull().default("0"),
  politicasRh: boolean("politicas_rh").notNull(),
  status: quoteStatusEnum("status").notNull().default("pendente"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true });
export const insertQuoteSchema = createInsertSchema(quotesTable).omit({ id: true, status: true, createdAt: true });

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotesTable.$inferSelect;
