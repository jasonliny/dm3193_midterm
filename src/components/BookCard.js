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
        <h2>
          <a href={`/book/${id}`}>
            <span className="book-title">{title}</span> by {author}
          </a>
        </h2>
      </div>
    </div>
  );
}
export default BookCard;
