"use client";

import React, { useState } from "react";

// Zod
import { z } from "zod";

// Custom Validation & Config
import {
  signInSchema,
  signUpSchema,
  verificationSchema,
} from "@/validation/auth.schema";
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
import { useSignUpHelper } from "@/lib/auth/useSignUpHelper";
import CardFormWrapper from "../shared/CardFormWrapper";
import FormInput from "../shared/FormInput";

function AuthForm({ formType }: { formType: "signup" | "signin" }) {
  const [verifying, setVerifying] = useState(false);
  const isSignUp = formType === "signup";

  const { verificationForm, authForm } = useAuthFormConfig(isSignUp);
  const { handleSignIn } = useSignInHelper();
  const { isLoaded, handleSignUp, handleVerification } = useSignUpHelper();

  const authFormInputs = {
    identifier: isSignUp ? "メールアドレス" : "メールアドレス/ユーザー名",
    password: "パスワード",
  };

  // onSubmit Handler
  const onSubmit = async (
    values: z.infer<typeof signUpSchema | typeof signInSchema>,
  ) => {
    if (!isLoaded) return;

    isSignUp
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
      <CardFormWrapper>
        <Form key="verification" {...verificationForm}>
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
      </CardFormWrapper>
    );
  }

  // Main Authentication Code Form
  return (
    <CardFormWrapper cardHeader={isSignUp ? "アカウント登録" : "ログイン"}>
      <Form key="auth-form" {...authForm}>
        <form onSubmit={authForm.handleSubmit(onSubmit)} className="space-y-8">
          {Object.entries(authFormInputs).map(([formFieldName, name]) => (
            <FormInput
              key={formFieldName}
              control={authForm.control}
              formFieldName={formFieldName}
              labelName={name}
              inputType={formFieldName === "password" ? "password" : ""}
            />
          ))}
          {/* <FormField
            control={authForm.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isSignUp
                    ? "メールアドレス"
                    : "メールアドレスもしくはユーザー名"}
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@TomoDevelops.com" {...field} />
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
          /> */}
          {/* CAPTCHA Widget */}
          <div id="clerk-captcha" />
          <Button type="submit" className="px-10">
            {isSignUp ? "登録" : "ログイン"}
          </Button>
          <FormDescription>
            {isSignUp
              ? `アカウントを持っている方は`
              : `アカウントを持っていない方は`}
            <Link
              href={isSignUp ? "/signin" : "/signup"}
              className="text-blue-400 underline"
            >
              こちら
            </Link>
          </FormDescription>
        </form>
      </Form>
    </CardFormWrapper>
  );
}

export default AuthForm;
