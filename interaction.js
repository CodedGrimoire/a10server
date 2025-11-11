// interaction.js
import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * GET all comments for a specific book
 * GET /books/:bookId/comments
 */
router.get("/books/:bookId/comments", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const commentsCol = db.collection("comments");
    const bookId = req.params.bookId;

    const comments = await commentsCol
      .find({ bookId: bookId })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(comments);
  } catch (err) {
    console.error("Failed to fetch comments:", err);
    res.status(500).send({ message: "Failed to fetch comments" });
  }
});

/**
 * CREATE a comment for a book
 * POST /comments
 * body: { bookId, userEmail, userName, comment }
 */
router.post("/comments", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const commentsCol = db.collection("comments");
    const { bookId, userEmail, userName, comment } = req.body;

    if (!bookId || !userEmail || !userName || !comment) {
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

    const result = await commentsCol.insertOne(doc);
    res.send(result);
  } catch (err) {
    console.error("Failed to create comment:", err);
    res.status(500).send({ message: "Failed to create comment" });
  }
});

/**
 * UPDATE a comment
 * PUT /comments/:id
 * body: { comment: "new text" }
 */
router.put("/comments/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const commentsCol = db.collection("comments");
    const id = req.params.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "comment is required" });
    }

    const result = await commentsCol.updateOne(
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
  } catch (err) {
    console.error("Failed to update comment:", err);
    res.status(500).send({ message: "Failed to update comment" });
  }
});

/**
 * DELETE a comment
 * DELETE /comments/:id
 */
router.delete("/comments/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const commentsCol = db.collection("comments");
    const id = req.params.id;

    const result = await commentsCol.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.send(result);
  } catch (err) {
    console.error("Failed to delete comment:", err);
    res.status(500).send({ message: "Failed to delete comment" });
  }
});

export default router;
