import {
  createChildUser,
  createParentUser,
} from "@/db/drizzle/queries/users.queries";
import {
  InsertChildUser,
  InsertParentUser,
} from "@/db/drizzle/schemas/users.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  try {
    if (requestData.type === "parent") {
      await parentUser(requestData.userData);
    }
    if (requestData.type === "child") {
      await parentUser(requestData.userData);
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 },
    );
  }
  return NextResponse.json(null, { status: 201 });
}

const parentUser = async (userData: InsertParentUser) => {
  await createParentUser(userData);
};

const childUser = async (userData: InsertChildUser) => {
  await createChildUser(userData);
};
