import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Post Agent",
  description: "Generate polished LinkedIn posts from a short brief",
  metadataBase: new URL("https://agentic-507ca66a.vercel.app"),
  openGraph: {
    title: "LinkedIn Post Agent",
    description: "Generate polished LinkedIn posts from a short brief",
    url: "https://agentic-507ca66a.vercel.app",
    siteName: "LinkedIn Post Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Post Agent",
    description: "Generate polished LinkedIn posts from a short brief",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
