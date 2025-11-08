// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Haven backend is running");
});

app.use("/", routes);

// for Vercel, you usually export the app
export default app;

// if you still want to run locally with `node server.js`, uncomment below:
//
// const port = 5001;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
