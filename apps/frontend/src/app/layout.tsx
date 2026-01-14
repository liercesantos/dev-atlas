import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { constructMetadata } from "@/lib/seo/metadata";
import { SkipLink } from "@/components/layout/skip-link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SkipLink />
        <RootProvider>
          <div id="main-content">
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
