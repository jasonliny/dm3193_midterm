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
      .get(`https://the-one-api.dev/v2/book`)
      .then(function (response) {
        setBooks(response.data.docs);
      })
      .catch(function (error) {
        setBooks([]);
      });
  }, []);

  console.log(books);
  return (
    <div>
      <h1>
        <span className="book-title">Lord of the Rings</span>
      </h1>
      {books.map((book) => (
        <BookCard author="J.R.R. Tolkien" id={book._id} title={book.name} />
      ))}
      {/* <BookCard
        author="J.R.R. Tolkien"
        image="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1654215925l/61215351._SY475_.jpg"
        title="The Fellowship of the Ring"
      /> */}
    </div>
  );
}

export default Home;
