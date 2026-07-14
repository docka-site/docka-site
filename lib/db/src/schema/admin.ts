import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

export const policyholderStatusEnum = pgEnum("policyholder_status", [
  "ativo",
  "inativo",
]);

export const policyStatusEnum = pgEnum("policy_status", [
  "ativa",
  "vencida",
  "cancelada",
  "pendente",
]);

export const adminUsersTable = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminSessionsTable = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  adminUserId: integer("admin_user_id").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const policyholdersTable = pgTable("policyholders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  cnpj: text("cnpj").notNull().unique(),
  status: policyholderStatusEnum("status").notNull().default("ativo"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const policiesTable = pgTable("policies", {
  id: serial("id").primaryKey(),
  policyholderId: integer("policyholder_id").notNull(),
  productId: integer("product_id"),
  policyNumber: text("policy_number"),
  fileName: text("file_name"),
  fileUrl: text("file_url"),
  status: policyStatusEnum("status").notNull().default("ativa"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsersTable.$inferSelect;
export type InsertAdminUser = typeof adminUsersTable.$inferInsert;
export type Policyholder = typeof policyholdersTable.$inferSelect;
export type InsertPolicyholder = typeof policyholdersTable.$inferInsert;
export type Product = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;
export type Policy = typeof policiesTable.$inferSelect;
export type InsertPolicy = typeof policiesTable.$inferInsert;
