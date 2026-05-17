import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude-Code-Web-Interactive-Learn — 互动教学平台",
  description: "在浏览器中操作终端模拟器，按步骤学习 Claude Code",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Claude-Code-Web-Interactive-Learn — 互动教学平台",
    description: "在浏览器中操作终端模拟器，按步骤学习 Claude Code",
    url: SITE_URL,
    siteName: "Claude-Code-Web-Interactive-Learn",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Claude-Code-Web-Interactive-Learn — 互动教学平台",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Claude-Code-Web-Interactive-Learn",
    url: SITE_URL,
  };

  return (
    <html lang="zh" className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-sans), -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
