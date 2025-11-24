import { router } from "./routes/index.ts";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  return await router(url.pathname, req);
});
