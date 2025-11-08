import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

// Resolve directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from current directory
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Validate environment variable
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing from .env file");
  process.exit(1);
}

// MongoDB client setup
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB and start server
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db("book_haven");
    app.locals.db = db; // make db accessible from other route files

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

run().catch(console.dir);
