export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/assets/")) {
      const path = url.pathname.replace("/assets/", "");
      const file = await env.webGameAssets.get(path);
      if (!file) {
        return new Response(`No such asset ${file}`, { status: 404 });
      }
      const headers = new Headers();
      const contentType = file.httpMetadata?.contentType || file.contentType || "application/octet-stream";
      headers.set("Content-Type", contentType);
      if (file.httpEtag) {
        headers.set("ETag", file.httpEtag);
      }
      return new Response(file.body, { headers });
    }
    return env.ASSETS.fetch(request);
  },
};