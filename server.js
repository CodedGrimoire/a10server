import path from "path";

import express from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";


import { MongoClient, ServerApiVersion } from "mongodb";
import routes from "./routes.js";


import cors from "cors";


import interactionRoutes from "./interaction.js";   

const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();


const port = process.env.PORT || 5001;

app.use(cors());


app.use(express.json());

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing from .env file");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,


    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db("book_haven");
    app.locals.db = db;

   //healthyy check
    app.get("/", (req, res) => {
      res.send("Book Haven backend is running");
    });
//boi er route
    app.use("/", routes);        
    
    
    //xcomment er shob route

    app.use("/", interactionRoutes); 

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
  
  catch (err) 
  
  {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

run().catch(console.dir);
