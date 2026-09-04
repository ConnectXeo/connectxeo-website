import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.connectxeo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ConnectXeo — AI/ML Solutions & Cloud Services",
    template: "%s | ConnectXeo",
  },
  description:
    "ConnectXeo offers AI/ML solutions, custom model training, agentic solutions, voice agents, automation, web development, and cloud solutions. Pakistan-based, globally trusted.",
  keywords: [
    "AI solutions",
    "ML solutions",
    "machine learning",
    "custom model training",
    "agentic AI",
    "voice agents",
    "automation agency",
    "cloud solutions",
    "web development",
    "AI agency Pakistan",
    "ConnectXeo",
    "AI SaaS",
    "LLM fine-tuning",
    "AI consulting",
  ],
  authors: [{ name: "ConnectXeo", url: BASE_URL }],
  creator: "ConnectXeo",
  publisher: "ConnectXeo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ConnectXeo — AI/ML Solutions & Cloud Services",
    description:
      "End-to-end AI, automation, and cloud solutions. Custom model training, agentic AI, voice agents, web development — Pakistan-based, globally trusted.",
    url: BASE_URL,
    siteName: "ConnectXeo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConnectXeo — AI/ML Solutions & Cloud Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConnectXeo — AI/ML Solutions & Cloud Services",
    description:
      "End-to-end AI, automation, and cloud solutions. Pakistan-based, globally trusted.",
    images: ["/og-image.png"],
    creator: "@connectxeo",
    site: "@connectxeo",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ConnectXeo",
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    description:
      "ConnectXeo is a Pakistan-based technology company offering AI/ML solutions, custom model training, agentic AI, voice agents, automation, web development, and cloud solutions.",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.tiktok.com/@connectxeo",
      "https://www.youtube.com/@connectxeo",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${BASE_URL}/contact`,
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Cloud Computing",
      "Software Development",
      "AI Agents",
      "Voice AI",
      "Business Automation",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-57MFPSSX9Y" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-57MFPSSX9Y');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-[family-name:var(--font-inter)]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <GoogleAnalytics gaId="G-57MFPSSX9Y" />
      </body>
    </html>
  );
}
