import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { LOTR_API_KEY } from "../API_KEYS";
import Nav from "../components/Nav";

// Homepage with a heading/page title on top
// Contains book cards generated with data gotten from an API ("The One API")

function Home() {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${LOTR_API_KEY}`,
  };

  const [books, setBooks] = useState([]);

  // Set books data to array of books returned by The One API
  useEffect(() => {
    axios
      .get(`https://the-one-api.dev/v2/book`, headers)
      .then(function (response) {
        setBooks(response.data.docs);
      })
      .catch(function (error) {
        setBooks([]);
      });
  }, []);

  // Heading and page title with generated book cards using books data
  return (
    <div className="Home">
      <Nav />
      <h1>
        <span className="book-title">The Lord of the Rings</span> Book Series
      </h1>
      <div className="books">
        {books.map((book) => (
          <BookCard
            author="J.R.R. Tolkien"
            id={book._id}
            key={book._id}
            title={book.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
