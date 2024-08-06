import { authSchema, verificationSchema } from "@/validation/auth.schema";
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
            email: "",
            password: "",
        },
    });

    return { verificationForm, authForm };
};
