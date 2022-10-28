import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LOTR_API_KEY } from "../API_KEYS";
import lotrBookQuotes from "../components/lotr-book-quotes";
import lotrBooks from "../components/lotr-books";
import Nav from "../components/Nav";

// Individual book page
// Title on top
// Box with a cover image and a quote (styled to have cover on left and quote on right)

function Book() {
  // Get id of book from URL
  const { id } = useParams();
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${LOTR_API_KEY}`,
  };

  // Use id of book to get data from The One API
  const [book, setBook] = useState([]);
  useEffect(() => {
    axios
      .get(`https://the-one-api.dev/v2/book/${id}`, { headers })
      .then(function (response) {
        setBook(response.data.docs[0]);
      })
      .catch(function (error) {
        setBook({});
      });
  }, []);

  // Set title of page to match book title
  document.title = book.name;

  // Get a random quote from the book on the current page, and image of the book's cover, and how liked the quote was (relRating)
  const { aQuote, imageURL, relRating } = useMemo(() => {
    let title = book.name || ""; // title is used for identifying the books from the JSON data in lotr-books.js and lotr-book-quotes.js

    // From the JSON data containing cover image URLs, find the correct array (one that has a matching title)
    let curBook = lotrBooks.filter(
      (book) => book.title.toLocaleLowerCase() === title.toLowerCase()
    );
    if (curBook.length === 0) {
      curBook = [{}];
    }

    // Gets only quotes from the book on the page
    let curQuotes = lotrBookQuotes.filter(
      (someQuote) => someQuote.title.toLowerCase() === title.toLowerCase()
    );
    // Prevents error that would occur if no quotes matched
    if (curQuotes.length === 0) {
      curQuotes = [{}];
    }

    // Selects a random quote from the ones available
    let randInd = Math.floor(curQuotes.length * Math.random());
    let selectQuote = curQuotes[randInd] || {};

    // Gets the number of likes the selected quote has received
    let selectLikes = selectQuote.likes | 0;

    // Finds the max number of likes any quote has received
    let maxLikes = 1;
    for (let i = 0; i < curQuotes.length; i++) {
      if (curQuotes[i].likes > maxLikes) {
        maxLikes = curQuotes[i].likes;
      }
    }

    return {
      aQuote: selectQuote.quote,
      imageURL: curBook[0].imageURL,
      relRating: (selectLikes / maxLikes) * 0.5 + 0.5, // scale relative rating (likes) to be from 0.5 to 1
    };
  }, [book]);

  // Heading
  // Book title
  // Rounded box containing a cover image and a quote from the book
  return (
    <div className="book-page-wrapper">
      <Nav />
      <div className="book-page">
        <h1>
          <span className="book-title">{book.name}</span>
        </h1>
        <div className="book-details">
          <div className="book-cover-img-wrapper">
            <img src={imageURL} alt={`book cover for ${book.name}`} />
          </div>
          <div className="quote">
            <h3
              style={{
                textShadow: `0px 0px 10px rgba(255,255,0,${relRating})`,
              }} // Text glows gold with the intensity determined by how many likes it recived on Goodreads
            >
              Quote from <span className="book-title">{book.name}</span>:{" "}
            </h3>
            <p>
              <span
                style={{
                  textShadow: `0px 0px 1px rgba(255,255,0,${relRating})`, // Text glows gold with the intensity determined by how many likes it recived on Goodreads
                }}
              >
                {aQuote}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Book;
