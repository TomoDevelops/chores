import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { FC } from "react";

interface CardFormWrapperProps {
  cardHeader?: string;
  children: React.ReactNode;
}

const CardFormWrapper: FC<CardFormWrapperProps> = ({
  cardHeader,
  children,
}) => {
  return (
    <Card className="w-3/4 py-8 xl:w-1/4">
      {cardHeader && (
        <CardHeader>
          <CardTitle>{cardHeader}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardFormWrapper;
