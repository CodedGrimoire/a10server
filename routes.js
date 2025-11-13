import express from "express";


import { ObjectId } from "mongodb";

const router = express.Router();



router.get("/all-books", async (req, res) => {
  try {
    const db = req.app.locals.db;

    const booksColection = db.collection("books");

    const sort = {};
    if (req.query.sort === "rating-desc") 
      
    {
      sort.rating = -1;
    } 
    
    else if (req.query.sort === "rating-asc") 
      
      {
      sort.rating = 1;
    } 
    
    else 
      
      {
      sort._id = -1;
    }

    const books = await booksColection.find().sort(sort).toArray();
    res.send(books);
  }
  
  catch (err) 
  
  {
    res.status(500).send({ message: "Failed to fetch books" });
  }
});



router.post("/add-book", async (req, res) => {
  try {
    const db = req.app.locals.db;


    const booksColection = db.collection("books");

    const book = req.body;

    const required = [
      "title",
      "author",
      "genre",
      "rating",
      "summary",
      "coverImage",
      "userEmail",
      "userName",
    ];
    for (const field of required) {
      if (!book[field]) 
        
        {
        return res.status(400).send({ message: `${field} is required` });
      }
    }

    const result = await booksColection.insertOne(book);
    res.send(result);
  } 
  
  catch (err)
  
  {
    res.status(500).send({ message: "Failed to add book" });
  }
});



router.put("/update-book/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksColection = db.collection("books");



    const id = req.params.id;
  const payload = req.body;

    const result = await booksColection.updateOne(
      { _id: new ObjectId(id) },
      { $set: payload }
    );

    if (result.matchedCount === 0) 
      
      
      {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send(result);
  } 
  
  catch (err) 
  
  {
    res.status(500).send({ message: "Failed to update book" });
  }
});


//deleting
router.delete("/delete-book/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksColection = db.collection("books");
    const id = req.params.id;

    const result = await booksColection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) 
      
      
      {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send(result);
  } 
  
  
  catch (err)
  
  
  {
    res.status(500).send({ message: "Failed to delete book" });
  }
});
//email diyee boi
router.get("/myBooks", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) 
      
      {
      return res.status(400).send({ message: "email query is required" });
    }

    const db = req.app.locals.db;


    const booksColection = db.collection("books");


    const books = await booksColection.find({ userEmail: email }).toArray();
    res.send(books);
  } 
  
  catch (err)
  
  {
    res.status(500).send({ message: "Failed to fetch user books" });
  }
});




router.get("/books/latest", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksColection = db.collection("books");
    const books = await booksColection.find().sort({ _id: -1 }).limit(6).toArray();


    res.send(books);
  } 
  
  
  catch (err) 
  
  
  {
    res.status(500).send({ message: "Failed to fetch latest books" });
  }
});


router.get("/books/top-rated", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksColection = db.collection("books");
    const books = await booksColection.find().sort({ rating: -1 }).limit(3).toArray();
    res.send(books);
  } 
  
  
  catch (err) 
  
  
  {
    res.status(500).send({ message: "Failed to fetch top rated books" });
  }
});



router.get("/book-details/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const booksColection = db.collection("books");
    const id = req.params.id;

    const book = await booksColection.findOne({ _id: new ObjectId(id) });
    if (!book)
      
      {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send(book);
  } 
  
  
  catch (err) 
  
  
  
  
  {
    res.status(500).send({ message: "Failed to fetch book details" });
  }
});


export default router;
