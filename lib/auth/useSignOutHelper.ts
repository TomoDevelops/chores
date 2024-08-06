import { useClerk } from "@clerk/nextjs";

export const useSignOutHelper = () => {
    const { signOut } = useClerk();

    const handleSignOut = async (redirectUrl: string = "/") => {
        signOut({ redirectUrl: redirectUrl });
    };

    return { handleSignOut };
};
