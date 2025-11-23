import { router } from "./routes/index.ts";

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  return router(url.pathname);
});
