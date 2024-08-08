ALTER TABLE "child_users" ALTER COLUMN "parent_accounts" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "child_users" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "child_users" ALTER COLUMN "password" SET NOT NULL;