import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("db.sqlite");

export default database;
