import { signUpSchema } from "@/validation/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const useSignInHelper = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSignIn = async (values: z.infer<typeof signUpSchema>) => {
    try {
      if (values.identifier.includes("@")) {
        const signInAttempt = await signIn?.create({
          identifier: values.identifier,
          password: values.password,
        });
        if (signInAttempt?.status === "complete" && setActive) {
          await setActive({
            session: signInAttempt.createdSessionId,
          });
          router.push("/");
        }
      } else {
        await childSignIn(values.identifier, values.password);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const childSignIn = async (username: string, password: string) => {
    // console.log(username, password);
  };

  return { handleSignIn };
};
