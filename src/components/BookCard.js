import React from "react";
import lotrBookCovers from "./lotr-books";

function BookCard({ author, id, title }) {
  let imageURL = lotrBookCovers.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  ).imageURL;

  // Card used on homepage with a book's cover image and its title and author (styled to have everything centerd with the image on top title and author below it)
  // The image and title and author are also links going to their respective individual book pages
  return (
    <div className="book-card-wrapper">
      <div className="book-card">
        <div className="font-cover">
          <a href={`/book/${id}`}>
            <img src={imageURL} alt={`book cover for ${title}`}></img>
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
