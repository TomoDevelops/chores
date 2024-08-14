"use client";

import React from "react";

// Auth
import { useSession } from "@clerk/nextjs";
import { useSignOutHelper } from "@/lib/auth/useSignOutHelper";

// UI
import ButtonLink from "./ButtonLink";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { isLoaded, isSignedIn } = useSession();
  const { handleSignOut } = useSignOutHelper();

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
                <Link href={"/account-link"}>アカウント連携</Link>
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
