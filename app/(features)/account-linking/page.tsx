"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const AccountLinking = () => {
  return (
    <>
      <Button onClick={() => console.log("create")}>Create User</Button>
      <Button onClick={() => console.log("delete")}>Delete User</Button>
    </>
  );
};

export default AccountLinking;
