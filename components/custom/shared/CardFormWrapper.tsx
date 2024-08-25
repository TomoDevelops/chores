import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { FC } from "react";

interface CardFormWrapperProps {
  cardHeader?: string;
  cardWidth?: string;
  children: React.ReactNode;
}

const CardFormWrapper: FC<CardFormWrapperProps> = ({
  cardHeader,
  cardWidth,
  children,
}) => {
  return (
    <Card className={cardWidth ?? `w-3/4 py-8 lg:w-1/2 2xl:w-1/4`}>
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
