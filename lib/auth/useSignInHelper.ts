import { authSchema } from "@/validation/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const useSignInHelper = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const handleSignIn = async (values: z.infer<typeof authSchema>) => {
        try {
            const signInAttempt = await signIn?.create({
                identifier: values.email,
                password: values.password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt?.status === "complete" && setActive) {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push("/");
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return { handleSignIn };
};
