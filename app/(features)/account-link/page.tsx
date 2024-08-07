import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const AccountLinking = async () => {
  const user = await currentUser();
  if (!user) return;
  console.log(user);
  return <h1>user</h1>;
};

export default AccountLinking;
