import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { LOTR_API_KEY } from "../API_KEYS";

function Home() {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${LOTR_API_KEY}`,
  };

  const [books, setBooks] = useState([]);

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

  console.log(books);
  return (
    <div className="Home">
      <h1>
        <span className="book-title">The Lord of the Rings</span> Book Series
      </h1>
      <div className="books">
        {books.map((book) => (
          <BookCard author="J.R.R. Tolkien" id={book._id} title={book.name} />
        ))}
      </div>
    </div>
  );
}

export default Home;
