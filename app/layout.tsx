import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Inter from next/font/google automatically loads the variable version
// and exposes it as --font-inter CSS custom property
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
