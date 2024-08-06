"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Zod
import { z } from "zod";

// Custom Validation & Config
import { authSchema, verificationSchema } from "@/validation/auth.schema";
import { AuthFormConfig } from "@/config/auth/authFormConfig";

// UI
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function AuthForm({ formType }: { formType: "signup" | "signin" }) {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verifying, setVerifying] = useState(false);
    const router = useRouter();

    const { verificationForm, authForm } = AuthFormConfig();

    // onSubmit Handler
    const onSubmit = async (values: z.infer<typeof authSchema>) => {
        if (!isLoaded) return;

        formType === "signup"
            ? await handleSignUp(values)
            : await handleSignIn();
    };

    // onVerify Handler
    const onVerify = async (values: z.infer<typeof verificationSchema>) => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: values.verificationCode,
                }
            );

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            console.error("Error:", JSON.stringify(err, null, 2));
        }
    };

    const handleSignUp = async (values: z.infer<typeof authSchema>) => {
        try {
            await signUp?.create({
                emailAddress: values.email,
                password: values.password,
            });

            await signUp?.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setVerifying(true);
        } catch (err: any) {
            console.log(err);
        }
        console.log(values);
    };

    const handleSignIn = async () => {};

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
