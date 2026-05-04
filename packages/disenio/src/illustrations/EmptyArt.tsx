"use client";
import * as React from "react";
import { useTheme, type Feel } from "../theme/ThemeProvider";

/**
 * Feel-aware empty-state illustrations.
 * Each Feel gets a distinctive art language; pass `art` to <EmptyState> to override.
 */

interface ArtProps {
  size?: number;
}

export function ModernArt({ size = 72 }: ArtProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="14" width="44" height="36" rx="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M28 32 L32 36 L40 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export function EditorialArt({ size = 72 }: ArtProps) {
  // Ink line drawing — quill / open book
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <path d="M8 56 Q20 44 36 44 Q52 44 64 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M36 44 L36 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M36 22 Q42 18 48 14 Q42 18 36 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" fill="currentColor" fillOpacity="0.06" />
      <circle cx="22" cy="50" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="46" cy="50" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M14 50 L18 50 M50 50 L58 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function PlayfulArt({ size = 72 }: ArtProps) {
  // Bouncy doodle — squiggle + sparkles
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <path
        d="M12 44 Q22 28 30 44 T48 44 T62 36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.6" />
      <path
        d="M52 12 L54 18 L60 18 L55.5 22 L57 28 L52 24 L47 28 L48.5 22 L44 18 L50 18 Z"
        fill="currentColor"
        opacity="0.5"
      />
      <circle cx="58" cy="50" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="14" cy="58" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function StarkArt({ size = 72 }: ArtProps) {
  // ASCII / monospace block art
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="currentColor" opacity="0.85">
        <text x="14" y="20">[ ]</text>
        <text x="34" y="20">[ ]</text>
        <text x="14" y="36">[█]</text>
        <text x="34" y="36">[ ]</text>
        <text x="14" y="52">[ ]</text>
        <text x="34" y="52">[█]</text>
      </g>
      <rect x="6" y="8" width="60" height="56" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ClinicalArt({ size = 72 }: ArtProps) {
  // Isometric flat — stacked cards
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <g opacity="0.85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M14 38 L36 26 L58 38 L36 50 Z" fill="currentColor" fillOpacity="0.06" />
        <path d="M14 30 L36 18 L58 30 L36 42 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M14 22 L36 10 L58 22 L36 34 Z" fill="currentColor" fillOpacity="0.02" />
      </g>
    </svg>
  );
}

const ART_BY_FEEL: Record<Feel, React.FC<ArtProps>> = {
  modern: ModernArt,
  modernDark: ModernArt,
  editorial: EditorialArt,
  playful: PlayfulArt,
  stark: StarkArt,
  clinical: ClinicalArt,
};

export function FeelEmptyArt({ size = 72 }: ArtProps) {
  const { feel } = useTheme();
  const Art = ART_BY_FEEL[feel] ?? ModernArt;
  return <Art size={size} />;
}
