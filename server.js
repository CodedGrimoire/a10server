import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Haven backend is running");
});

let db = null;

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing from .env file");
} else {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  (async () => {
    try {
      await client.connect();
      console.log("Connected to MongoDB Atlas");
      db = client.db("book_haven");
      app.locals.db = db;
    } catch (err) {
      console.error("MongoDB connection failed:", err);
    }
  })();
}

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
