
import express from "express";
import { ObjectId } from "mongodb";


const router = express.Router();

//boi er comment


router.get("/books/:bookId/comments", async (req, res) => {
  try {
    const db = req.app.locals.db;


    const comColection = db.collection("comments");

    const bookId = req.params.bookId;

    const comments = await comColection
      .find({ bookId: bookId })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(comments);
  } 
  
  
  catch (err) 
  
  
  {
    console.error("Failed to fetch comments:", err);

    res.status(500).send({ message: "Failed to fetch comments..try again" });
  }
});

//comment likuaaa


router.post("/comments", async (req, res) => {
  try {
    const db = req.app.locals.db;

    const comColection = db.collection("comments");
    const { bookId, userEmail, userName, comment } = req.body;

    if (!bookId || !userEmail || !userName || !comment) 
      
      {
      return res.status(400).send({
        message: "bookId, userEmail, userName and comment are required",
      });
    }

    const doc = {
      bookId,
      userEmail,
      userName,
      comment,
      createdAt: new Date(),
    };

    const result = await comColection.insertOne(doc);
    res.send(result);
  } 
  
  catch (err)
  
  {
    console.error("Failed to create comment:", err);
    res.status(500).send({ message: "Could not   create comment" });
  }
});



// cooment cng
router.put("/comments/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const comColection = db.collection("comments");
    const id = req.params.id;
    const { comment } = req.body;

    if (!comment)
      
      {
      return res.status(400).send({ message: "comment is required" });
    }

    const result = await comColection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          comment,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.send(result);
  } 
  
  
  catch (err)
  
  {
    console.error("Failed to update comment:", err);
    res.status(500).send({ message: "Failed to update comment" });
  }
});

//deletiongg


router.delete("/comments/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const comColection = db.collection("comments");
    const id = req.params.id;

    const result = await comColection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      
      {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.send(result);
  } 
  
  catch (err) 
  
  
  {
    console.error("Failed to delete comment:", err);
    res.status(500).send({ message: "Could not delete comment" });
  }
});

export default router;
