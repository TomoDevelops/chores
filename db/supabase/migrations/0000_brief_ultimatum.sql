CREATE TABLE IF NOT EXISTS "child_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_accounts" integer,
	"account_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parent_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"account_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "parent_users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "child_users" ADD CONSTRAINT "child_users_parent_accounts_parent_users_id_fk" FOREIGN KEY ("parent_accounts") REFERENCES "public"."parent_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
