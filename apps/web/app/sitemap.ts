import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://disenio.io";

const ROUTES = [
  "/",
  "/docs",
  "/docs/setup",
  "/docs/installation",
  "/docs/cli",
  "/docs/theming",
  "/docs/pairs",
  "/docs/components",
  "/docs/components/badge",
  "/docs/components/button",
  "/docs/components/card",
  "/docs/components/dialog",
  "/docs/components/input",
  "/docs/components/layout",
  "/docs/components/select",
  "/docs/components/switch",
  "/docs/components/tabs",
  "/docs/components/textarea",
  "/docs/components/toast",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
