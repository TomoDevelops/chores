import {
  getChildUserByParentClerkUserId,
  getParentUserById,
  getUserAccountType,
} from "@/db/drizzle/queries/users.queries";
import {
  SelectChildUser,
  SelectParentUser,
} from "@/db/drizzle/schemas/users.schema";

type UserWithAccountType =
  | (SelectChildUser & { userAccountType: string })
  | (SelectParentUser & { userAccountType: string });

export async function POST(request: Request) {
  const { parentClerkUserId, accountType } = await request.json();
  const userAccountType = await getUserAccountType(id);

  return new Response(JSON.stringify(userAccountType), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
