#!/bin/bash

echo "=== 1️⃣ Root Check ==="
curl -s http://localhost:5001/
echo -e "\n"

echo "=== 2️⃣ All Books ==="
curl -s http://localhost:5001/all-books | jq .
echo -e "\n"

echo "=== 3️⃣ Latest 6 Books ==="
curl -s http://localhost:5001/books/latest | jq .
echo -e "\n"

echo "=== 4️⃣ Get Single Book (Replace ID if needed) ==="
BOOK_ID="690f6122cf235ce59c506611"
curl -s http://localhost:5001/book-details/$BOOK_ID | jq .
echo -e "\n"

echo "=== 5️⃣ Add New Book ==="
curl -s -X POST http://localhost:5001/add-book \
-H "Content-Type: application/json" \
-d '{
  "title": "Deep Work",
  "author": "Cal Newport",
  "genre": "Productivity",
  "rating": 4.6,
  "summary": "A guide to focused success in a distracted world.",
  "coverImage": "https://example.com/deep_work.jpg",
  "userEmail": "testuser@example.com",
  "userName": "Test User"
}' | jq .
echo -e "\n"

echo "=== 6️⃣ Update Existing Book ==="
curl -s -X PUT http://localhost:5001/update-book/$BOOK_ID \
-H "Content-Type: application/json" \
-d '{"rating": 4.9, "summary": "Updated summary — even more gripping than before."}' | jq .
echo -e "\n"

echo "=== 7️⃣ Books for Specific User ==="
curl -s "http://localhost:5001/myBooks?email=testuser@example.com" | jq .
echo -e "\n"

echo "=== 8️⃣ Top-Rated Books ==="
curl -s http://localhost:5001/books/top-rated | jq .
echo -e "\n"

echo "=== 9️⃣ Delete Book (optional, disable if you want to keep data) ==="
# Uncomment next line to delete the test book
# curl -s -X DELETE http://localhost:5001/delete-book/$BOOK_ID | jq .
# echo -e "\n"

echo "✅ All routes tested."
