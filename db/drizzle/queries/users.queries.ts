import { db } from "@/db/drizzle";
import {
  InsertChildUser,
  InsertParentUser,
  SelectChildUser,
  SelectParentUser,
  childUsersTable,
  parentUsersTable,
} from "@/db/drizzle/schemas/users.schema";
import { eq } from "drizzle-orm";

// Parent Users
export async function createParentUser(data: InsertParentUser) {
  await db.insert(parentUsersTable).values(data);
}

export async function getParentUserById(
  clerkUserId: SelectParentUser["clerkUserId"],
): Promise<
  Array<{
    id: number;
    clerkUserId: string;
    accountImage: string | null;
  }>
> {
  return db
    .select()
    .from(parentUsersTable)
    .where(eq(parentUsersTable.clerkUserId, clerkUserId));
}

export async function deleteParentUser(
  clerkUserId: SelectParentUser["clerkUserId"],
) {
  await db
    .delete(parentUsersTable)
    .where(eq(parentUsersTable.clerkUserId, clerkUserId));
}

export async function updateParentUserInfo(
  clerkUserId: SelectParentUser["clerkUserId"],
) {
  await db
    .update(parentUsersTable)
    .set({ accountImage: null })
    .where(eq(parentUsersTable.clerkUserId, clerkUserId));
}

export async function getParentUserIdByClerkUserId(clerkUserId: string) {
  return db
    .select({ id: parentUsersTable.id })
    .from(parentUsersTable)
    .where(eq(parentUsersTable.clerkUserId, clerkUserId));
}

// Child Users
export async function createChildUser(
  data: InsertChildUser,
  parentClerkUserId: string,
) {
  const parentId = await getParentUserIdByClerkUserId(parentClerkUserId);

  if (parentId.length === 0) {
    throw new Error("エラーが発生しました。");
  }

  const childUserData = {
    ...data,
    parentAccounts: parentId[0].id,
  };
  await db.insert(childUsersTable).values(childUserData);
}

export async function getChildUserById(id: SelectChildUser["id"]): Promise<
  Array<{
    id: number;
    accountImage: string | null;
  }>
> {
  return db.select().from(childUsersTable).where(eq(childUsersTable.id, id));
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
    .from(childUsersTable)
    .where(eq(childUsersTable.parentAccounts, parentId[0].id));
}

export async function deleteChildUser(id: SelectChildUser["id"]) {
  await db.delete(childUsersTable).where(eq(childUsersTable.id, id));
}

export async function updateChildUserInfo(id: SelectChildUser["id"]) {
  await db
    .update(childUsersTable)
    .set({ accountImage: null })
    .where(eq(childUsersTable.id, id));
}
