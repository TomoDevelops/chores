import {
  authSchema,
  childAccountSchema,
  verificationSchema,
} from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useAuthFormConfig = () => {
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const childAccountForm = useForm<z.infer<typeof childAccountSchema>>({
    resolver: zodResolver(childAccountSchema),
    defaultValues: {
      identifier: "",
      displayName: "",
      password: "",
    },
  });

  return { verificationForm, authForm, childAccountForm };
};
