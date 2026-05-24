import type { Metadata } from "next";
import "./globals.css";

// Configure viewport settings, including themeColor
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }, // White for light mode
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" }, // Dark grey for dark mode
  ],
};

export const metadata: Metadata = {
  title: "Snippet Editor",
  description: "Code Editor",
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
