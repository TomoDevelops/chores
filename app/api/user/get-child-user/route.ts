import { getChildUserByParentClerkUserId } from "@/db/drizzle/queries/users.queries";

export async function POST(request: Request) {
  const { parentClerkUserId } = await request.json();

  const users = await getChildUserByParentClerkUserId(parentClerkUserId);

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
