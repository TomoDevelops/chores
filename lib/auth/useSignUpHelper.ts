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
        setVerifying: Dispatch<SetStateAction<boolean>>;
    }) => {
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

    // onVerify Handler
    const handleVerification = async (
        values: z.infer<typeof verificationSchema>
    ) => {
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

    return { isLoaded, handleSignUp, handleVerification };
};
