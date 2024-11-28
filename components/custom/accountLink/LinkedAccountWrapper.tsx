"use client";

import { SelectUser } from "@/db/drizzle/schemas/users.schema";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

const LinkedAccountWrapper = ({
  parentClerkUserId,
}: {
  parentClerkUserId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [childAccounts, setChildAccounts] = useState<SelectUser[]>([]);

  useEffect(() => {
    const fetchLinkedChildAccounts = async () => {
      setLoading(true);
      await fetch("/api/user/get-child-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentClerkUserId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setChildAccounts(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };

    fetchLinkedChildAccounts();
  }, [parentClerkUserId]);

  return (
    <ul className="flex flex-col gap-4">
      {loading ? (
        <>
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </>
      ) : (
        <>
          {childAccounts.length > 0 ? (
            childAccounts.map((childAccount: any) => (
              <li key={childAccount.id}>
                <ProfileCard
                  displayName={childAccount.displayName}
                  imageUrl={childAccount.imageUrl}
                />
              </li>
            ))
          ) : (
            <div className="w-full">
              <p className="text-center">お子様のアカウントがありません。</p>
            </div>
          )}
        </>
      )}
    </ul>
  );
};

export default LinkedAccountWrapper;
