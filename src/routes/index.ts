import { getContentInstanceData } from "../core/services.ts";

export function router(path: string) {
  if (path === "/noticias") {
    return Response.json({ data: getContentInstanceData("noticias") });
  }
  if (path === "/becas") {
    return Response.json({ data: getContentInstanceData("becas") });
  }

  return Response.json({ message: "Hello world" });
}
