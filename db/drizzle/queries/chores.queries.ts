import { db } from "@/db/drizzle";
import {
  InsertChore,
  SelectChore,
  choresTable,
} from "../schemas/chores.schema";
import { eq } from "drizzle-orm";

export async function getChoresByUserId(userId: string) {
  return db
    .select()
    .from(choresTable)
    .where(eq(choresTable.clerkUserId, userId));
}

// Insert
// export async function insertChore(chore: InsertChore) {
//   return db.insertInto(choresTable).values(chore);
// }
