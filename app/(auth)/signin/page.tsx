"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// components
import AuthForm from "@/components/custom/AuthForm";

const Signin = () => {
    const { isLoaded, isSignedIn } = useSession();
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            setShowForm(true);
        } else if (isSignedIn) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn, router]);

    return (
        <main className="flex min-h-screen w-full items-center justify-center">
            {!isLoaded && <div>Loading...</div>}
            {showForm && <AuthForm formType="signin" />}
        </main>
    );
};

export default Signin;
