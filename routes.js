// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import { getDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Haven backend is running");
});

app.get("/debug/db", async (req, res) => {
  try {
    const db = await getDB();
    const count = await db.collection("books").countDocuments();
    res.send({ ok: true, count });
  } catch (err) {
    res.status(500).send({ ok: false, error: err.message });
  }
});

app.use("/", routes);

export default app;

// for local
 const port = 5001;
 app.listen(port, () => console.log("running on", port));
