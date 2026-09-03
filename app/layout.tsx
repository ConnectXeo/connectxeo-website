import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
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
  title: "ConnectXeo — AI/ML Solutions & Cloud Services",
  description:
    "ConnectXeo offers AI/ML solutions, custom model training, agentic solutions, voice agents, automation, web development, and cloud solutions.",
  keywords: [
    "AI",
    "ML",
    "SaaS",
    "automation",
    "voice agents",
    "cloud solutions",
    "ConnectXeo",
  ],
  openGraph: {
    title: "ConnectXeo — AI/ML Solutions & Cloud Services",
    description:
      "AI/ML solutions, custom model training, agentic solutions, voice agents, automation, web development, and cloud solutions.",
    url: "https://connectxeo.com",
    siteName: "ConnectXeo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
