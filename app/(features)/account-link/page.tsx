import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import AccountLinkForm from "@/components/custom/accountLink/AccountLinkForm";
import LinkedAccountWrapper from "@/components/custom/accountLink/LinkedAccountWrapper";
import { TabWrapper } from "@/components/custom/shared/tabs/TabWrapper";
import TabContentWrapper from "@/components/custom/shared/tabs/TabContentWrapper";

const AccountLinking = async () => {
  const user = await currentUser();
  const tabHeader = {
    "account-create": "お子様のアカウントの登録",
    "account-list": "連携済のお子様のアカウント",
  };
  if (!user) return;

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <TabWrapper tabHeader={tabHeader}>
        <TabContentWrapper tabContentKey="account-create">
          <AccountLinkForm parentClerkUserId={user.id} />
        </TabContentWrapper>
        <TabContentWrapper tabContentKey="account-list">
          <LinkedAccountWrapper parentClerkUserId={user.id} />
        </TabContentWrapper>
      </TabWrapper>
    </main>
  );
};

export default AccountLinking;
