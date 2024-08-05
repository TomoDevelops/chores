import AuthForm from "@/components/custom/AuthForm";
import React from "react";

const Signin = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <AuthForm formType="signin" />
        </div>
    );
};

export default Signin;
