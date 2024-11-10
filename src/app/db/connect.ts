// lib/sqlite.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
  return open({
    filename: "./database.db", // Path to your SQLite database file
    driver: sqlite3.Database,
  });
};

export default openDb;
