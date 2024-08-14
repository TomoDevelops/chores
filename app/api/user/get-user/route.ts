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

  let users;

  if (accountType === "parent") {
    users = await getParentUser(parentClerkUserId);
  }
  if (accountType === "child") {
    users = await getChildUser(parentClerkUserId);
  }

  if (!users) {
    return new Response(
      JSON.stringify({ message: "ユーザーが見つかりませんでした。" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  for (const user of users as UserWithAccountType[]) {
    user.userAccountType = await getUserAccountType(user.id);
  }

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const getParentUser = async (userId: string) => {
  return await getParentUserById(userId);
};

const getChildUser = async (parentUserId: string) => {
  return await getChildUserByParentClerkUserId(parentUserId);
};
