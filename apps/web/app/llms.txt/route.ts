import { AI_PROMPT } from "../_lib/aiPrompt";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  return new Response(AI_PROMPT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
