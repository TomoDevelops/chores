"use client";

import React from "react";
import CardFormWrapper from "../shared/CardFormWrapper";
import { Form } from "@/components/ui/form";

import { childAccountSchema } from "@/validation/auth.schema";
import { useAuthFormConfig } from "@/config/auth/useAuthFormConfig";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormInput from "../shared/FormInput";
import { useRouter } from "next/navigation";
import { useSignUpHelper } from "@/lib/auth/useSignUpHelper";

const AccountLinkForm = ({
  parentClerkUserId,
}: {
  parentClerkUserId: string;
}) => {
  const { childAccountForm } = useAuthFormConfig();
  const { handleSignUp } = useSignUpHelper();
  const router = useRouter();

  const formInputs = {
    identifier: "ユーザー名",
    displayName: "表示名",
    password: "パスワード",
  };

  //   onSubmit Handler
  const onSubmit = async (values: z.infer<typeof childAccountSchema>) => {
    try {
      await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "child",
          parentClerkUserId,
          userData: {
            userName: values.identifier,
            displayName: values.displayName,
            password: values.password,
          },
        }),
      });
    } catch (err: any) {
      console.log(err);
    }
    router.push("/");
  };

  return (
    <CardFormWrapper cardHeader="お子様のアカウントを登録">
      <Form key="child-account-form" {...childAccountForm}>
        <form
          onSubmit={childAccountForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {Object.entries(formInputs).map(([formFieldName, name]) => (
            <FormInput
              key={formFieldName}
              control={childAccountForm.control}
              formFieldName={formFieldName}
              labelName={name}
              inputType={formFieldName === "password" ? "password" : ""}
            />
          ))}
          <Button type="submit">登録する</Button>
        </form>
      </Form>
    </CardFormWrapper>
  );
};

export default AccountLinkForm;