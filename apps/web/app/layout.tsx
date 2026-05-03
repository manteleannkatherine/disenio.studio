import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@disenio/ui";

export const metadata: Metadata = {
  title: "disenio.io — a copy-paste design toolkit",
  description:
    "Editorial. Customizable. Yours. Components you copy, theme, and own — with live feel switching and exportable themes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
