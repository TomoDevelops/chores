import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const noto = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "家事お手伝いアプリ",
    description: "子供の家事お手伝いの管理アプリ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={noto.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
