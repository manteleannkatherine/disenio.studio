"use client";
import Image from "next/image";
import { useTheme } from "@disenio/ui";

export function BrandLockup({ height = 28 }: { height?: number }) {
  const { feel } = useTheme();
  const isDark = feel === "modernDark";
  const src = isDark ? "/disenio-io-dark.png" : "/disenio-io-light.png";
  // intrinsic ratio of the logo art ~ 3.2:1
  const width = Math.round(height * 3.2);
  return (
    <Image
      src={src}
      alt="disenio.io"
      width={width}
      height={height}
      priority
      className="select-none"
    />
  );
}
