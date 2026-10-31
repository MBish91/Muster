// Muster art worker: turns a text prompt into a painted image with Cloudflare Workers AI (free tier).
const ALLOW = ["https://mbish91.github.io", "http://localhost:8777"];
export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOW.includes(origin) ? origin : ALLOW[0],
      "Vary": "Origin",
    };
    const p = new URL(req.url).searchParams.get("p");
    if (!p) return new Response("Muster art worker is running", { headers: cors });
    try {
      const r = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt: p.slice(0, 2000), steps: 8 });
      const bin = Uint8Array.from(atob(r.image), (c) => c.charCodeAt(0));
      return new Response(bin, { headers: { ...cors, "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000" } });
    } catch (e) {
      return new Response("generation failed", { status: 502, headers: cors });
    }
  },
};
