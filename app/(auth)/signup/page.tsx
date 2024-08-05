import AuthForm from "@/components/custom/AuthForm";
import React from "react";

const Signup = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <AuthForm formType="signup" />
        </div>
    );
};

export default Signup;
