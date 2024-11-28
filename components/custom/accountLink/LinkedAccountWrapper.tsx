import { SelectUser } from "@/db/drizzle/schemas/users.schema";
import React from "react";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

const LinkedAccountWrapper = ({
  childAccounts,
}: {
  childAccounts: SelectUser[];
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {childAccounts.length > 0 ? (
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
      ) : (
        <>
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </>
      )}
    </ul>
  );
};

export default LinkedAccountWrapper;
