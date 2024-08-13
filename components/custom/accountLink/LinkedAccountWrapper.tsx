"use client";
import { SelectChildUser } from "@/db/drizzle/schemas/users.schema";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

const LinkedAccountWrapper = ({
  parentClerkUserId,
}: {
  parentClerkUserId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [childAccounts, setChildAccounts] = useState<SelectChildUser[]>([]);

  useEffect(() => {
    const fetchLinkedChildAccounts = async () => {
      setLoading(true);
      const response = await fetch("/api/get-child-user", {
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
    <>
      {loading ? (
        <ProfileCardSkeleton />
      ) : (
        <ul>
          {childAccounts.length > 0
            ? childAccounts.map((childAccount: any) => (
                <ProfileCard
                  key={childAccount.id}
                  displayName={childAccount.displayName}
                  imageUrl={childAccount.imageUrl}
                />
              ))
            : null}
        </ul>
      )}
    </>
  );
};

export default LinkedAccountWrapper;
