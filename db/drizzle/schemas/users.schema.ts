import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("account_type", ["parent", "child"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").unique().notNull(),
  accountType: accountTypeEnum("account_type").notNull(),
  userName: text("user_name").unique(),
  linkedAccounts: integer("linked_accounts").array(),
  displayName: text("display_name"),
  accountImage: text("account_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
