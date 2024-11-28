"use client";
import React, { useEffect } from "react";
import AccountLinkForm from "@/components/custom/accountLink/AccountLinkForm";
import LinkedAccountWrapper from "@/components/custom/accountLink/LinkedAccountWrapper";
import { TabWrapper } from "@/components/custom/shared/tabs/TabWrapper";
import TabContentWrapper from "@/components/custom/shared/tabs/TabContentWrapper";
import { SelectUser } from "@/db/drizzle/schemas/users.schema";
import { useUserIdStore } from "@/stores/user-id-store";

const AccountLinking = () => {
  const { userId } = useUserIdStore();
  const [childAccounts, setChildAccounts] = React.useState<SelectUser[]>([]);
  const tabHeader = {
    "account-create": "お子様の登録",
    "account-list": "お子様のアカウント",
  };

  useEffect(() => {
    const getChildUser = async () => {
      await fetch("/api/user/get-child-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentClerkUserId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setChildAccounts(data))
        .catch((err) => console.error(err));
    };
    if (userId) {
      getChildUser();
    }
  }, [userId]);

  return (
    <main className="my-20 flex w-full items-center justify-center">
      {userId && (
        <TabWrapper tabHeader={tabHeader}>
          <TabContentWrapper tabContentKey="account-create">
            <AccountLinkForm parentClerkUserId={userId} />
          </TabContentWrapper>
          <TabContentWrapper tabContentKey="account-list">
            <LinkedAccountWrapper childAccounts={childAccounts} />
          </TabContentWrapper>
        </TabWrapper>
      )}
    </main>
  );
};

export default AccountLinking;
