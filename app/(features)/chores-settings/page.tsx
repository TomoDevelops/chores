"use client";
import { SelectChore } from "@/db/drizzle/schemas/chores.schema";
import { useUserIdStore } from "@/stores/user-id-store";
import { currentUser } from "@clerk/nextjs/server";
import React, { useEffect, useState } from "react";

const ChoresSettingsPage = () => {
  const { userId } = useUserIdStore();
  const [chores, setChores] = useState<SelectChore[]>([]);

  useEffect(() => {
    const fetchChores = async () => {
      await fetch("/api/chores/get-chores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setChores(data))
        .catch((err) => console.error(err));
    };
    if (userId) fetchChores();
  }, [userId]);

  return (
    <main className="my-20 flex w-full items-center justify-center">
      <div>{JSON.stringify(chores)}</div>
    </main>
  );
};

export default ChoresSettingsPage;
