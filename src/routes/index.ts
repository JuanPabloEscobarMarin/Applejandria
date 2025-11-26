import { getContentInstanceData } from "../core/services.ts";
import database from "../database.ts";
import richtext from "../tmp/richtext-example.json" with { type: "json" };
import { ContentType } from "../types/typesAll.ts";

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

export async function router(path: string, req: Request) {
  if (path === "/noticias") {
    return Response.json({ data: getContentInstanceData("noticias") });
  }
  if (path === "/becas") {
    return Response.json({ data: getContentInstanceData("becas") });
  }
  if (path === "/content-types") {
    const contentTypes = database.prepare("SELECT * FROM content_types");
    const fields = database.prepare(
      "select f.id, f.name, f.type from content_type_fields join fields as f ON content_type_fields.field_id = f.id where content_type_id = ?",
    );

    const result: ContentType = contentTypes.get();
    result.fields = fields.all(1);
    return Response.json(result);
  }
  if (path === "/content") {
    const data: RootNode = richtext.root;
    const html = renderBlocks(data.children);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
  if (path === "/database") {
    switch (req.method) {
      case "GET": {
        const query = database.prepare("SELECT * FROM data");
        return Response.json(query.all());
      }
      case "POST": {
        const { key, value } = await req.json();
        try {
          database.prepare("INSERT INTO data (key, value) VALUES (?, ?)").run(
            key,
            value,
          );
        } catch (error) {
          return Response.json({
            message: "Error al crear el dato",
            error,
          }, { status: 400 });
        }
        return Response.json({ message: "Creado correctamente" });
      }
    }
  }

  return Response.json({ message: "Hello world" });
}
