"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Custom Validation
import { authSchema, verificationSchema } from "@/validation/auth.schema";

// UI
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function AuthForm({ formType }: { formType: "signup" | "signin" }) {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verifying, setVerifying] = useState(false);
    const router = useRouter();

    const verificationForm = useForm<z.infer<typeof verificationSchema>>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            verificationCode: "",
        },
    });

    const authForm = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

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
            <Form key="verification-form" {...verificationForm}>
                <form
                    onSubmit={verificationForm.handleSubmit(onVerify)}
                    className="space-y-8 w-10/12 xl:w-1/3"
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
        );
    }

    // Main Authentication Code Form
    return (
        <Form key="auth-form" {...authForm}>
            <form
                onSubmit={authForm.handleSubmit(onSubmit)}
                className="space-y-8 w-10/12 xl:w-1/3"
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
                <Button type="submit">
                    {formType === "signup" ? "登録" : "ログイン"}
                </Button>
            </form>
        </Form>
    );
}

export default AuthForm;
