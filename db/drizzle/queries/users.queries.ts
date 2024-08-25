import { db } from "@/db/drizzle";
import {
  InsertUser,
  SelectUser,
  usersTable,
} from "@/db/drizzle/schemas/users.schema";
import { and, arrayContains, eq, sql } from "drizzle-orm";

// Shared
export async function getUserByClerkUserId(clerkUserId: string) {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkUserId, clerkUserId));
}

// Parent Users
export async function createParentUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getParentUserById(
  clerkUserId: SelectUser["clerkUserId"],
): Promise<
  Array<{
    id: number;
    clerkUserId: string;
    accountImage: string | null;
  }>
> {
  return db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.clerkUserId, clerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );
}

export async function deleteParentUser(clerkUserId: SelectUser["clerkUserId"]) {
  await db
    .delete(usersTable)
    .where(
      and(
        eq(usersTable.clerkUserId, clerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );
}

export async function updateParentUserInfo(
  clerkUserId: SelectUser["clerkUserId"],
) {
  await db
    .update(usersTable)
    .set({ accountImage: null })
    .where(
      and(
        eq(usersTable.clerkUserId, clerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );
}

export async function getParentUserIdByClerkUserId(clerkUserId: string) {
  return db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(
      and(
        eq(usersTable.clerkUserId, clerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );
}

export async function linkChildUser(
  parentClerkUserId: string,
  childUserId: number,
) {
  const parentUser = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.clerkUserId, parentClerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );

  const linkedAccounts = parentUser[0].linkedAccounts || [];
  linkedAccounts.push(childUserId);

  await db
    .update(usersTable)
    .set({ linkedAccounts: linkedAccounts })
    .where(
      and(
        eq(usersTable.clerkUserId, parentClerkUserId),
        eq(usersTable.accountType, "parent"),
      ),
    );
}

// Child Users
export async function createChildUser(
  data: InsertUser,
  parentClerkUserId: string,
) {
  const parentId = await getParentUserIdByClerkUserId(parentClerkUserId);

  if (parentId.length === 0) {
    throw new Error("エラーが発生しました。");
  }

  const childUserData = {
    ...data,
    linkedAccounts: [parentId[0].id],
  };
  return await db
    .insert(usersTable)
    .values(childUserData)
    .returning({ id: usersTable.id });
}

export async function getChildUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    accountImage: string | null;
  }>
> {
  return db
    .select()
    .from(usersTable)
    .where(and(eq(usersTable.id, id), eq(usersTable.accountType, "child")));
}

export async function getChildUserByParentClerkUserId(
  parentClerkUserId: string,
) {
  const parentId = await getParentUserIdByClerkUserId(parentClerkUserId);

  if (parentId.length === 0) {
    throw new Error("エラーが発生しました。");
  }
  return db
    .select()
    .from(usersTable)
    .where(
      and(
        arrayContains(usersTable.linkedAccounts, [parentId[0].id]),
        eq(usersTable.accountType, "child"),
      ),
    );
}

export async function deleteChildUser(id: SelectUser["id"]) {
  await db
    .delete(usersTable)
    .where(and(eq(usersTable.id, id), eq(usersTable.accountType, "child")));
}

export async function updateChildUserInfo(id: SelectUser["id"]) {
  await db
    .update(usersTable)
    .set({ accountImage: null })
    .where(and(eq(usersTable.id, id), eq(usersTable.accountType, "child")));
}
