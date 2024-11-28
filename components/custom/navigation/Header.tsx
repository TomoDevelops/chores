"use client";

import React, { useEffect, useState } from "react";

// Auth
import { useSession } from "@clerk/nextjs";
import { useSignOutHelper } from "@/lib/auth/useSignOutHelper";

// UI
import ButtonLink from "./ButtonLink";
import ProfileDropdown from "./ProfileDropdown";
import ProfileAvatar from "../shared/ProfileAvatar";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserIdStore } from "@/stores/user-id-store";

const Header = () => {
  const { setUserId } = useUserIdStore();
  const { isLoaded, isSignedIn, session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userAccountType, setUserAccountType] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { handleSignOut } = useSignOutHelper();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userId = session?.user.id ?? null;
      setUserId(userId);
      await fetch("/api/user/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkUserId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setUserAccountType(data[0].accountType))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };

    if (session) fetchUser();
  }, [userAccountType, session]);

  const onSignOut = () => {
    if (sheetOpen) setSheetOpen(false);
    handleSignOut();
  };

  return (
    <header className="sticky top-0 flex h-20 w-full items-center overflow-hidden bg-background shadow-md">
      <nav className="flex max-h-full w-full items-center justify-between px-4 md:px-12">
        <h1>Logo</h1>
        <ul className="hidden items-center justify-between gap-4 md:flex">
          {isLoaded ? (
            isSignedIn ? (
              <>
                {userAccountType === "parent" ? (
                  <Link href={"/account-link"}>アカウント連携</Link>
                ) : null}
                <Link href={"/chores-settings"}>お手伝い管理</Link>
                <Link href={"/"}>Feature 3</Link>
                <ProfileDropdown signOut={onSignOut} />
              </>
            ) : (
              <>
                <ButtonLink buttonText="ログイン" buttonLink="/signin" />
                <ButtonLink buttonText="アカウント登録" buttonLink="/signup" />
              </>
            )
          ) : null}
          <ThemeToggle />
        </ul>
        <div className="block md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <ProfileAvatar />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <ul className="flex flex-col gap-4 py-16 text-right">
                {isLoaded ? (
                  isSignedIn ? (
                    <>
                      {userAccountType === "parent" ? (
                        <Link
                          href={"/account-link"}
                          onClick={() => setSheetOpen(false)}
                        >
                          アカウント連携
                        </Link>
                      ) : null}
                      <Link
                        href={"/chores-settings"}
                        onClick={() => setSheetOpen(false)}
                      >
                        お手伝い管理
                      </Link>
                      <Link href={"/"} onClick={() => setSheetOpen(false)}>
                        Feature 3
                      </Link>
                      <hr />
                      <Link
                        href={"/profile"}
                        onClick={() => setSheetOpen(false)}
                      >
                        プロフィール
                      </Link>
                      <button className="text-right" onClick={onSignOut}>
                        ログアウト
                      </button>
                    </>
                  ) : (
                    <>
                      <ButtonLink
                        buttonText="ログイン"
                        buttonLink="/signin"
                        onClick={() => setSheetOpen(false)}
                      />
                      <ButtonLink
                        buttonText="アカウント登録"
                        buttonLink="/signup"
                        onClick={() => setSheetOpen(false)}
                      />
                    </>
                  )
                ) : null}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
