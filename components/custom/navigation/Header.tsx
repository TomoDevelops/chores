"use client";

import React, { useEffect, useState } from "react";

// Auth
import { useSession } from "@clerk/nextjs";
import { useSignOutHelper } from "@/lib/auth/useSignOutHelper";

// UI
import ButtonLink from "./ButtonLink";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { isLoaded, isSignedIn, session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userAccountType, setUserAccountType] = useState("");
  const { handleSignOut } = useSignOutHelper();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session) return;
      setLoading(true);
      const userId = session.user?.id;
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

    fetchUser();
  }, [userAccountType, session]);

  const onSignOut = () => {
    handleSignOut();
  };

  return (
    <header className="sticky top-0 flex h-20 w-full items-center overflow-hidden bg-background shadow-md">
      <nav className="flex max-h-full w-full items-center justify-between px-12">
        <h1>Logo</h1>
        <ul className="flex items-center justify-between gap-4">
          {isLoaded ? (
            isSignedIn ? (
              <>
                {userAccountType === "parent" ? (
                  <Link href={"/account-link"}>アカウント連携</Link>
                ) : null}
                <Link href={"/"}>Feature 2</Link>
                <Link href={"/"}>Feature 3</Link>
                <ProfileAvatar avatarLink="/profile" signOut={onSignOut} />
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
      </nav>
    </header>
  );
};

export default Header;
