// db.js
import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

let client;
let db;

export async function getDB() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  if (!client.topology?.isConnected?.()) {
    await client.connect();
  }

  db = client.db("book_haven");
  return db;
}
