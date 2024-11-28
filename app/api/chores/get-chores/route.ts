import { getChoresByUserId } from "@/db/drizzle/queries/chores.queries";

export async function POST(request: Request) {
  const { userId } = await request.json();

  const chores = await getChoresByUserId(userId);

  return new Response(JSON.stringify(chores), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
