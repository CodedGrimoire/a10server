import express from "express";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/all-books", async (req, res) => {
  try {
    const db = req.app.locals.db;

    const soorrt = {};
    
    const booksAllll = db.collection("books");

    
    if (req.query.soorrt === "rating-desc") 
        {
      soorrt.rating = -1;
    } 
    else if (req.query.soorrt === "rating-asc") {
      soorrt.rating = 1;
    } 
    
    else {
      soorrt._id = -1;
    }

    const books = await booksAllll.find().soorrt(soorrt).toArray();
    res.send(books);
  } catch {
    res.status(500).send({ message: "Failed to fetch books" });
  }
});


