import React from "react";

function BookCard({ author, id, image, title }) {
  return (
    <div className="book-card">
      {/* <div className="font-cover">
        <a href={`/book/${id}`}>
          <img src={image}></img>
        </a>
      </div> */}
      <a href={`/book/${id}`}>
        <h2>
          <span className="book-title">{title}</span> by {author}
        </h2>
      </a>
      {/* <div>
        <p>
          Title: <span className="book-title">{title}</span>
        </p>
        <p>Author: {author}</p>
      </div> */}
    </div>
  );
}
export default BookCard;
