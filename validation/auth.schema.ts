import { z } from "zod";

export const signUpSchema = z.object({
  identifier: z
    .string()
    .email({ message: "メールアドレスを入力してください。" })
    .min(1, {
      message: "メールアドレスを入力してください。",
    }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上で入力してください。",
    })
    .max(20, {
      message: "パスワードは20文字以内で入力してください。",
    }),
});

export const signInSchema = z.object({
  identifier: z.string().min(1, {
    message: "メールアドレス/ユーザー名を入力してください。",
  }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上で入力してください。",
    })
    .max(20, {
      message: "パスワードは20文字以内で入力してください。",
    }),
});

export const verificationSchema = z.object({
  verificationCode: z.string().min(1, {
    message: "認証コードを入力してください。",
  }),
});

export const childAccountSchema = z.object({
  identifier: z.string().min(5, {
    message: "ユーザー名は5文字以上で入力してください。",
  }),
  password: z
    .string()
    .min(5, { message: "パスワードは5文字以上で入力してください。" }),
  displayName: z.string(),
});
