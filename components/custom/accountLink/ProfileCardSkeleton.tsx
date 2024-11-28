import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileCardSkeleton = () => {
  return (
    <Card className="flex h-28 w-full items-center gap-2 px-4 py-6 md:gap-6">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-5/6" />
    </Card>
  );
};

export default ProfileCardSkeleton;
