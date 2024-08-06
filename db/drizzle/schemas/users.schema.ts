import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const parentUsersTable = pgTable("parent_users", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").unique().notNull(),
  accountImage: text("account_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const childUsersTable = pgTable("child_users", {
  id: serial("id").primaryKey(),
  parentAccounts: integer("parent_accounts").references(
    () => parentUsersTable.id,
    { onDelete: "cascade" },
  ),
  accountImage: text("account_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertParentUser = typeof parentUsersTable.$inferInsert;
export type SelectParentUser = typeof parentUsersTable.$inferSelect;

export type InsertChildUser = typeof childUsersTable.$inferInsert;
export type SelectChildUser = typeof childUsersTable.$inferSelect;
