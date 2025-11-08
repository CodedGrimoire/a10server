import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const client = new MongoClient(process.env.MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db("book_haven");
    const books = await db
      .collection("books")
      .find({}, { projection: { _id: 1, title: 1 } })
      .limit(5)
      .toArray();

    console.log("Books in database:");
    console.log(books);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
