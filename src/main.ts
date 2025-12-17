import { router } from "./routes/index.ts";

function cors(handler: (req: Request) => Response | Promise<Response>) {
  return async (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    const res = await handler(req);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, { ...res, headers });
  };
}

Deno.serve(
  cors((req) => {
    const url = new URL(req.url);
    return router(url.pathname, req);
  }),
);
