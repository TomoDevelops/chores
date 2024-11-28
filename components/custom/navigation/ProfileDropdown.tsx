import React from "react";
import Link from "next/link";
// UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileAvatar from "../shared/ProfileAvatar";

const ProfileDropdown = ({
  avatarImage,
  signOut,
}: {
  avatarImage?: string;
  signOut: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar avatarImage={avatarImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/profile">プロフィール</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
