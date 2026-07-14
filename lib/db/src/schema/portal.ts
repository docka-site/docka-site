import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const clientOtpsTable = pgTable("client_otps", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientSessionsTable = pgTable("client_sessions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientAccountsTable = pgTable("client_accounts", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  googleId: text("google_id"),
  isTempPassword: boolean("is_temp_password").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ClientOtp = typeof clientOtpsTable.$inferSelect;
export type ClientSession = typeof clientSessionsTable.$inferSelect;
export type ClientAccount = typeof clientAccountsTable.$inferSelect;
