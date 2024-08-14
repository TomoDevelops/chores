import { getUserByClerkUserId } from "@/db/drizzle/queries/users.queries";
import { SelectUser } from "@/db/drizzle/schemas/users.schema";

export async function POST(request: Request) {
  const { clerkUserId } = await request.json();

  const user = await getUserByClerkUserId(clerkUserId);

  if (!user) {
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

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
