"use client";

import React, { useState } from "react";

// Zod
import { z } from "zod";

// Custom Validation & Config
import { authSchema, verificationSchema } from "@/validation/auth.schema";
import { useAuthFormConfig } from "@/config/auth/useAuthFormConfig";
import { useSignInHelper } from "@/lib/auth/useSignInHelper";

// UI
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignUpHelper } from "@/lib/auth/useSignUpHelper";

function AuthForm({ formType }: { formType: "signup" | "signin" }) {
    const [verifying, setVerifying] = useState(false);

    const { verificationForm, authForm } = useAuthFormConfig();
    const { handleSignIn } = useSignInHelper();
    const { isLoaded, handleSignUp, handleVerification } = useSignUpHelper();

    // onSubmit Handler
    const onSubmit = async (values: z.infer<typeof authSchema>) => {
        if (!isLoaded) return;

        formType === "signup"
            ? await handleSignUp({ values, setVerifying })
            : await handleSignIn(values);
    };

    const onVerify = async (values: z.infer<typeof verificationSchema>) => {
        if (!isLoaded) return;

        await handleVerification(values);
    };

    // Verification Code Form
    if (verifying) {
        return (
            <Card className="w-3/4 xl:w-1/4 py-8">
                <CardContent>
                    <Form key="verification-form" {...verificationForm}>
                        <form
                            onSubmit={verificationForm.handleSubmit(onVerify)}
                            className="space-y-8"
                        >
                            <FormField
                                control={verificationForm.control}
                                name="verificationCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>認証コード</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">認証する</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        );
    }

    // Main Authentication Code Form
    return (
        <Card className="w-3/4 xl:w-1/4 py-8">
            <CardHeader>
                <CardTitle>
                    {formType === "signup" ? "アカウント登録" : "ログイン"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form key="auth-form" {...authForm}>
                    <form
                        onSubmit={authForm.handleSubmit(onSubmit)}
                        className="space-y-8 "
                    >
                        <FormField
                            control={authForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@TomoDevelops.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={authForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>パスワード</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* CAPTCHA Widget */}
                        <div id="clerk-captcha" />
                        <Button type="submit" className="px-10">
                            {formType === "signup" ? "登録" : "ログイン"}
                        </Button>
                        <FormDescription>
                            {formType === "signup"
                                ? `アカウントを持っている方は`
                                : `アカウントを持っていない方は`}
                            <Link
                                href={
                                    formType === "signup"
                                        ? "/signin"
                                        : "/signup"
                                }
                                className="underline text-blue-400"
                            >
                                こちら
                            </Link>
                        </FormDescription>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default AuthForm;
