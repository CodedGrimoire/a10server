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




router.get("/book-details/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
     const id = req.params.id;

    const boookCol = db.collection("books");
   

    const book = await boookCol.findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send(book);
  } 
  
  catch 
  
  {
    res.status(500).send({ message: "Failed to fetch book details" });
  }
});




router.get("/books/latest", async (req, res) => {
  try 
  {
    const db = req.app.locals.db;

      const books = await booksCol.find().sort({ _id: -1 }).limit(6).toArray();
    const booksCol = db.collection("books");
  
    res.send(books);
  } catch 
  {
    res.status(500).send({ message: "Failed to fetch latest books" });
  }
});

//boi add korbe


router.post("/add-book", async (req, res) => {
  try {
    const db = req.app.locals.db;

      const book = req.body;

    const booksCol = db.collection("books");
  
    const required = ["title", "author",
         "genre", "rating", "summary", "coverImage", "userEmail", "userName"];
    
         for (const field of required) {
      if (!book[field]) {
        return res.status(400).send({ message: `${field} is required` });
      }
    }

    const result = await booksCol.insertOne(book);
    res.send(result);
  } 
  catch 
  
  {
    res.status(500).send({ message: "Failed to add book" });
  }
});


//boi delte korbe
router.delete("/delete-book/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksCol = db.collection("books");


    const id = req.params.id;

    const result = await booksCol.deleteOne({ _id: new ObjectId(id) });


    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send(result);
  } 
  
  catch 
  {
    res.status(500).send({ message: "Failed to delete book" });
  }


});


//top rating boi ber korbe
router.get("/books/top-rated", async (req, res) => {
  try {
    const db = req.app.locals.db;

const booksCol = db.collection("books");


    const books = await booksCol.find().sort({ rating: -1 }).limit(3).toArray();

    res.send(books);
  } catch
  
  {
    res.status(500).send({ message: "Failed to fetch top rated books" });
  }


});


export default router;