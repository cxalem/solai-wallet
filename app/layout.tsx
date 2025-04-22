import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/components/Provider";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolAI",
  description: "SolAI wallet lets users send a single USDC transaction that gets split automatically among multiple recipients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased bg-zinc-900 text-zinc-100`}
      >
        <Providers>
          <NavBar />
          <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
