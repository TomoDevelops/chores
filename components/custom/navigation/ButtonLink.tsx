import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ButtonLink = ({
    buttonText,
    buttonLink,
}: {
    buttonText: string;
    buttonLink: string;
}) => {
    return (
        <Button asChild>
            <Link href={buttonLink}>{buttonText}</Link>
        </Button>
    );
};

export default ButtonLink;
