// export function BrandMark({ size = 32 }: { size?: number }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden className="shrink-0">
//       <defs>
//         <linearGradient id="ds-brand-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
//           <stop offset="0%" stopColor="#b27bff" />
//           <stop offset="50%" stopColor="#6d4cf2" />
//           <stop offset="100%" stopColor="#2f5dff" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M14 8 H30 A26 26 0 0 1 30 56 H14 V44 H30 A14 14 0 0 0 30 20 H14 Z"
//         fill="url(#ds-brand-grad)"
//       />
//       <circle cx="14" cy="44" r="8" fill="#a875ff" />
//     </svg>
//   );
// }

// export function BrandLockup({ height = 40 }: { height?: number }) {
//   // Wordmark sized off the mark — type ~ 0.7 of mark height looks balanced
//   const fontPx = Math.round(height * 0.7);
//   return (
//     <span className="inline-flex items-center gap-2 leading-none select-none">
//       <BrandMark size={height} />
//       <span
//         className="serif font-semibold tracking-[-0.04em] text-[var(--ds-ink)] leading-none"
//         style={{ fontSize: `${fontPx}px` }}
//       >
//         disenio<span className="brand-text">.io</span>
//       </span>
//     </span>
//   );
// }


"use client";
import Image from "next/image";
import { useTheme } from "@disenio/ui";

export function BrandLockup({ height = 28 }: { height?: number }) {
  const { feel } = useTheme();
  const isDark = feel === "modernDark";
  const src = isDark ? "/disenio-io-dark.png" : "/disenio-io.png";
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