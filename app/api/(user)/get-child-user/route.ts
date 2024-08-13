import { getChildUserByParentClerkUserId } from "@/db/drizzle/queries/users.queries";

export async function POST(request: Request) {
  const requestData = await request.json();
  const parentClerkUserId = requestData.parentClerkUserId;
  const childUser = await getChildUserByParentClerkUserId(parentClerkUserId);

  return new Response(JSON.stringify(childUser), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
