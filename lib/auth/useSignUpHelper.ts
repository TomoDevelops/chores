import { createParentUser } from "@/db/drizzle/queries/users.queries";
import { authSchema, verificationSchema } from "@/validation/auth.schema";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export const useSignUpHelper = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const handleSignUp = async ({
    values,
    setVerifying,
  }: {
    values: z.infer<typeof authSchema>;
    setVerifying?: Dispatch<SetStateAction<boolean>>;
  }) => {
    const signUpByEmail = values.identifier.includes("@");
    const signUpMethod = signUpByEmail
      ? { emailAddress: values.identifier }
      : { username: values.identifier };

    try {
      const user = await signUp?.create({
        ...signUpMethod,
        password: values.password,
      });

      if (!signUpByEmail) {
        router.push("/");
      }

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      if (setVerifying) setVerifying(true);
    } catch (err: any) {
      console.log(err);
    }
  };

  // onVerify Handler
  const handleVerification = async (
    values: z.infer<typeof verificationSchema>,
  ) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Save new user data to database
        await fetch("/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "parent",
            userData: {
              clerkUserId: completeSignUp.createdUserId,
            },
          }),
        });

        router.push("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return { isLoaded, handleSignUp, handleVerification };
};
