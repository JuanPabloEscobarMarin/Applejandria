export interface ContentInstance {
  id: string;
  contentType: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ContentType {
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

export interface FieldDefinition {
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

export type FieldType =
  | "text"
  | "richtext"
  | "number"
  | "boolean"
  | "date"
  | "json";
