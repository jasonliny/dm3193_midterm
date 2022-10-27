import React from "react";
import lotrBookCovers from "./lotr-books";

function BookCard({ author, id, title }) {
  let imageURL = lotrBookCovers.find(
    (book) => book.title.toLowerCase() == title.toLowerCase()
  ).imageURL;

  return (
    <div className="book-card-wrapper">
      <div className="book-card">
        <div className="font-cover">
          <a href={`/book/${id}`}>
            <img src={imageURL}></img>
          </a>
        </div>
        <a href={`/book/${id}`}>
          <h2>
            <span className="book-title">{title}</span> by {author}
          </h2>
        </a>
      </div>
    </div>
  );
}
export default BookCard;
