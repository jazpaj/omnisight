import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "OMNISIGHT | Decentralized AI Vision Agent Protocol",
  description:
    "Autonomous AI vision agents that analyze charts, NFTs, and images with verifiable on-chain receipts. Built on Solana.",
  openGraph: {
    title: "OMNISIGHT | AI Vision Agent Protocol",
    description: "See Everything. Analyze Anything. Verifiable AI vision on Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMNISIGHT | AI Vision Agent Protocol",
    description: "See Everything. Analyze Anything. Verifiable AI vision on Solana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${fragmentMono.variable} antialiased bg-black text-white`}
        style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
