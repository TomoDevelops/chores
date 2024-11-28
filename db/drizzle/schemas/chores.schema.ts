import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const choresTable = pgTable("chores", {
  id: serial("chore_id").primaryKey(),
  clerkUserId: text("clerk_user_id").unique().notNull(),
  choreName: text("chore_name").notNull(),
  chorePrice: integer("chore_price").notNull(),
  choreDescription: text("chore_description"),
  availableAccounts: integer("available_accounts").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertChore = typeof choresTable.$inferInsert;
export type SelectChore = typeof choresTable.$inferSelect;
