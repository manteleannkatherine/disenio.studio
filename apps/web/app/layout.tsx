import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider, ToastProvider } from "@disenio/ui";
import { CommandPalette } from "./_components/CommandPalette";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://disenio.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "disenio.studio — a copy-paste design toolkit",
    template: "%s · disenio.studio",
  },
  description:
    "A copy-paste design toolkit with a feel. 11 components, 8 layout primitives, 4 pairs, a CLI with diff/update, and exportable themes you can share as URLs.",
  authors: [{ name: "CreativeKat Studio", url: "https://creativekat.studio" }],
  creator: "CreativeKat Studio",
  publisher: "CreativeKat Studio",
  keywords: [
    "design system",
    "ui library",
    "react components",
    "tailwind",
    "shadcn alternative",
    "copy-paste components",
    "theme editor",
    "design tokens",
  ],
  openGraph: {
    type: "website",
    title: "disenio.studio — a copy-paste design toolkit",
    description: "A copy-paste design toolkit with a feel. Components, pairs, layouts, and a CLI.",
    url: siteUrl,
    siteName: "disenio.studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "disenio.studio — a copy-paste design toolkit",
    description: "A copy-paste design toolkit with a feel.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/disenio-studio-dark.png", type: "image/png" },
    ],
    apple: "/disenio-studio-dark.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ToastProvider>
            {children}
            <CommandPalette />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
