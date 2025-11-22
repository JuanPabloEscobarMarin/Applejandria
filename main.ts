interface ContentInstance {
  id: string;
  contentType: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

interface ContentType {
  id: string;
  name: string;
  slug: string;
  description?: string;

  fields: FieldDefinition[];

  options?: {
    draftAndPublish?: boolean;
    versioning?: boolean;
    i18n?: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
}

interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  unique?: boolean;
  default?: any;

  validations?: {
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    regex?: string;
  };

  relation?: {
    target: string;
    relationType: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
  };

  options?: any;
}

type FieldType =
  | "text"
  | "richtext"
  | "number"
  | "boolean"
  | "date"
  | "json"

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
];

function getContentInstanceData(slug: string) {
  const result: { name: string, value: any }[] = [];
  for (let i = 0; i < contentTypes.length; i++) {
      for (let j = 0; j < contentInstance.length; j++) {
        if (contentTypes[i].slug === slug) {
          contentTypes[i].fields.forEach((field) => {
            result.push({
              name: field.name,
              value: contentInstance[j].data[field.id]
            })
          });
        }
      }
    }

    return result;
}

Deno.serve((req) => {
  const url = new URL(req.url);

  if (url.pathname === "/noticias") {
    return Response.json({ data: getContentInstanceData("noticias") })
  }

  return Response.json({ message: "Hello world" });
});
