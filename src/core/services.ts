import { ContentInstance, ContentType } from "../types/typesAll.ts";

const contentTypes: ContentType[] = [
  {
    id: "001",
    name: "Noticias",
    slug: "noticias",
    fields: [
      {
        id: "001",
        name: "Title",
        type: "text",
      },
      {
        id: "002",
        name: "Published At",
        type: "date",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "002",
    name: "Becas",
    slug: "becas",
    fields: [
      {
        id: "001",
        name: "Beca1",
        type: "richtext",
      },
      {
        id: "002",
        name: "beca2",
        type: "json",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const contentInstance: ContentInstance[] = [
  {
    id: "001",
    contentType: "noticias",
    data: {
      "001": "Titulo de ejemplo",
      "002": new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "002",
    contentType: "becas",
    data: {
      "001": "Titulo de ejemplo de una beca",
      "002": {
        clave: "clave json",
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getContentInstanceData(slug: string) {
  const result: { name: string; value: any }[] = [];
  for (let i = 0; i < contentTypes.length; i++) {
    for (let j = 0; j < contentInstance.length; j++) {
      if (contentTypes[i].slug === slug) {
        contentTypes[i].fields.forEach((field) => {
          result.push({
            name: field.name,
            value: contentInstance[j].data[field.id],
          });
        });
      }
    }
  }

  return result;
}
