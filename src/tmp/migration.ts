import database from "../database.ts";

database.exec(`
  CREATE TABLE IF NOT EXISTS content_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    slug TEXT,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_TIMESTAMP
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS content_type_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type_id INTEGER NOT NULL,
    field_id INTEGER NOT NULL,
    FOREIGN KEY (content_type_id) REFERENCES content_types(id),
    FOREIGN KEY (field_id) REFERENCES fields(id)
  )
`);

const insertContentType = database.prepare(
  "INSERT INTO content_types (name, slug) VALUES (?, ?)",
);
const insertField = database.prepare(
  "INSERT INTO fields (name, type) VALUES (?, ?)",
);

const insertRelation = database.prepare(
  "INSERT INTO content_type_fields (content_type_id, field_id) VALUES (?, ?)",
);

insertContentType.run("Sport Article", "sport-article");
insertField.run("Title", "text");
insertRelation.run(1, 1);
