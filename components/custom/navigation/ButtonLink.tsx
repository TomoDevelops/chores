import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ButtonLink = ({
  buttonText,
  buttonLink,
  onClick,
}: {
  buttonText: string;
  buttonLink: string;
  onClick?: () => void;
}) => {
  return (
    <Button asChild>
      <Link href={buttonLink} onClick={onClick}>
        {buttonText}
      </Link>
    </Button>
  );
};

export default ButtonLink;
