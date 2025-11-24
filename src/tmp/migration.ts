import database from "../database.ts";

database.exec(
  "CREATE TABLE IF NOT EXISTS data(key INTEGER PRIMARY KEY, value TEXT) STRICT",
);

const insert = database.prepare("INSERT INTO data (key, value) VALUES (?, ?)");

insert.run(1, "Foo");
insert.run(2, "Bar");
