import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  themeColor: "#1e1e1e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://snippet-editor-lake.vercel.app"),
  title: "Snippet Editor",
  description:
    "Online code snippet editor built with Next.js. Create, organize, and manage code snippets in a VS Code inspired interface.",
  openGraph: {
    title: "Snippet Editor",
    description:
      "Online code snippet editor built with Next.js. Create, organize, and manage code snippets in a VS Code inspired interface.",
    url: "https://snippet-editor-lake.vercel.app",
    siteName: "Snippet Editor",
    type: "website",
  },
  manifest: "/site.webmanifest",
  verification: {
    // For google search engine for SEO
    google: "HREIZ3F7QKQ8eS5Kco0eJ772qHdySuFjC92s6ofiWUY",
  },
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
