import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";

// Resolve directory for .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// Mongo connection
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Seed data
const books = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    rating: 4.3,
    summary: "A psychological thriller about a woman's shocking act of violence and the therapist determined to uncover her motive.",
    coverImage: "https://example.com/silent_patient.jpg",
    userEmail: "alice@example.com",
    userName: "Alice Carter"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    rating: 4.8,
    summary: "An actionable guide for forming good habits and breaking bad ones through small, consistent improvements.",
    coverImage: "https://example.com/atomic_habits.jpg",
    userEmail: "bob@example.com",
    userName: "Bob Walker"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    rating: 4.7,
    summary: "An epic saga of politics, religion, and ecology on the desert planet Arrakis.",
    coverImage: "https://example.com/dune.jpg",
    userEmail: "carol@example.com",
    userName: "Carol Nguyen"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    rating: 4.9,
    summary: "A story of racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.",
    coverImage: "https://example.com/mockingbird.jpg",
    userEmail: "daniel@example.com",
    userName: "Daniel Kim"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    rating: 4.6,
    summary: "A chilling portrayal of a totalitarian regime and the erosion of truth and freedom.",
    coverImage: "https://example.com/1984.jpg",
    userEmail: "eva@example.com",
    userName: "Eva Li"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: 4.8,
    summary: "A reluctant hobbit sets out on an adventure filled with dragons, treasure, and unexpected courage.",
    coverImage: "https://example.com/hobbit.jpg",
    userEmail: "farhan@example.com",
    userName: "Farhan Ahmed"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    rating: 4.5,
    summary: "A memoir about growing up in a strict and isolated family, and the author's pursuit of education.",
    coverImage: "https://example.com/educated.jpg",
    userEmail: "gina@example.com",
    userName: "Gina Patel"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    rating: 4.2,
    summary: "Between life and death lies a library where every book represents a different version of your life.",
    coverImage: "https://example.com/midnight_library.jpg",
    userEmail: "henry@example.com",
    userName: "Henry Torres"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    rating: 4.7,
    summary: "A sweeping history of humankind’s evolution and the forces that shaped our societies.",
    coverImage: "https://example.com/sapiens.jpg",
    userEmail: "isabella@example.com",
    userName: "Isabella Moreno"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    rating: 4.4,
    summary: "A young shepherd sets out to find treasure and discovers his true destiny.",
    coverImage: "https://example.com/alchemist.jpg",
    userEmail: "jack@example.com",
    userName: "Jack Reynolds"
  }
];


async function seed() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("book_haven");
    const booksCol = db.collection("books");

    // Clear old data
    await booksCol.deleteMany({});
    console.log("Cleared existing books");

    // Insert new data
    const result = await booksCol.insertMany(books);
    console.log(`Inserted ${result.insertedCount} books`);
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

seed();
