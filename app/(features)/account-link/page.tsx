import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import AccountLinkForm from "@/components/custom/accountLink/AccountLinkForm";

const AccountLinking = async () => {
  const user = await currentUser();
  if (!user) return;

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <AccountLinkForm parentClerkUserId={user.id} />
    </main>
  );
};

export default AccountLinking;
