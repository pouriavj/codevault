import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  themeColor: "#1e1e1e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://codevault.ir"),
  title: "CodeVault",
  description:
    "Online code editor and storage, built with Next.js. Create, organize, and manage code snippets in a VS Code inspired interface.",
  openGraph: {
    title: "CodeVault",
    description:
      "Online code editor and storage, built with Next.js. Create, organize, and manage code snippets in a VS Code inspired interface.",
    url: "https://codevault.ir",
    siteName: "CodeVault",
    type: "website",
  },
  manifest: "/site.webmanifest",
  verification: {
    // For google search engine for SEO
    google: "fPGvKcuKD3SgZj63Qkvy1NG3s3azSzf_TKP8G-_uCM0",
  },
  authors: [{ name: "CodeVault" }],
  keywords: [
    "code editor",
    "snippet manager",
    "online IDE",
    "code vault",
    "snippet editor",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
