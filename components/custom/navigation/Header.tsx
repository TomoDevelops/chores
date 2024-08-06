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
        <header className="w-full h-20 overflow-hidden shadow-md sticky top-0 bg-background flex items-center">
            <nav className="max-h-full w-full px-12 flex justify-between items-center">
                <h1>Logo</h1>
                <ul className="flex justify-between items-center gap-4">
                    {isLoaded ? (
                        isSignedIn ? (
                            <>
                                <Link href={"/"}>Feature 1</Link>
                                <Link href={"/"}>Feature 2</Link>
                                <Link href={"/"}>Feature 3</Link>
                                <ProfileAvatar
                                    avatarLink="/profile"
                                    signOut={onSignOut}
                                />
                            </>
                        ) : (
                            <>
                                <ButtonLink
                                    buttonText="ログイン"
                                    buttonLink="/signin"
                                />
                                <ButtonLink
                                    buttonText="アカウント登録"
                                    buttonLink="/signup"
                                />
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
