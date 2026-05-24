import type { Metadata } from "next";
import "./globals.css";

// dark theme color
export const viewport = {
  themeColor: "#1e1e1e",
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
