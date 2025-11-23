import { getContentInstanceData } from "../core/services.ts";
import richtext from "../tmp/richtext-example.json" with { type: "json" };

interface Node {
  type?: string;
  content?: string;
  children?: Node[];
}

interface RootNode {
  children: Node[];
}

function renderBlocks(children: Node[]) {
  let html = "";

  for (const el of children) {
    switch (el.type) {
      case "title":
        html += `<h1>${el.content}</h1>`;
        break;

      case "paragraph":
        html += `<p>${el.content}</p>`;
        break;

      case "list-item":
        html += `<li>${el.content}</li>`;
        break;
    }

    if (el.children && el.children.length > 0) {
      switch (el.type) {
        case "list":
          html += "<ul>";
          html += renderBlocks(el.children);
          html += "</ul>";
          break;
      }
    }
  }

  return html;
}

export function router(path: string) {
  if (path === "/noticias") {
    return Response.json({ data: getContentInstanceData("noticias") });
  }
  if (path === "/becas") {
    return Response.json({ data: getContentInstanceData("becas") });
  }
  if (path == "/content") {
    const data: RootNode = richtext.root;
    const html = renderBlocks(data.children);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return Response.json({ message: "Hello world" });
}
