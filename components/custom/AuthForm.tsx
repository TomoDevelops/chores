"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";

function AuthForm({ formType }: { formType: "signup" | "signin" }) {
    const formSchema = z.object({
        username: z
            .string()
            .min(4, {
                message: "ユーザー名は4文字以上で入力してください。",
            })
            .max(30, {
                message: "ユーザー名は30文字以内で入力してください。",
            })
            .regex(/^[a-zA-Z0-9_-]*$/, {
                message:
                    "ユーザー名は半角英数字とハイフン(-)とアンダースコア(_)のみ利用できます。",
            }),
        password: z
            .string()
            .min(8, {
                message: "パスワードは8文字以上で入力してください。",
            })
            .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {
                message:
                    "パスワードは半角英数字を1文字以上含めて入力してください",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-10/12 xl:w-1/3"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                                <Input placeholder="TomoDevelops" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
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
