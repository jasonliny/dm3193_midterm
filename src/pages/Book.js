import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LOTR_API_KEY } from "../API_KEYS";
import lotrBookQuotes from "../components/lotr-book-quotes";
import lotrBooks from "../components/lotr-books";

function Book() {
  const { id } = useParams();
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${LOTR_API_KEY}`,
  };

  const [book, setBook] = useState([]);
  useEffect(() => {
    axios
      .get(`https://the-one-api.dev/v2/book/${id}`, headers)
      .then(function (response) {
        setBook(response.data.docs[0]);
        console.log("updateBook");
      })
      .catch(function (error) {
        setBook({});
      });
  }, []);

  const { aQuote, imageURL, relRating } = useMemo(() => {
    let title = book.name || "";
    let curQuotes = lotrBookQuotes.filter(
      (someQuote) => someQuote.title.toLowerCase() == title.toLowerCase()
    );
    if (curQuotes.length == 0) {
      curQuotes = [{}];
    }
    let randInd = Math.floor(curQuotes.length * Math.random());
    let selectQuote =
      curQuotes[Math.floor(curQuotes.length * Math.random())] || {};

    let curBook = lotrBooks.filter(
      (book) => book.title.toLocaleLowerCase() == title.toLowerCase()
    );
    if (curBook.length == 0) {
      curBook = [{}];
    }

    let maxLikes = 1;
    let selectLikes = selectQuote.likes | 0;
    for (let i = 0; i < curQuotes.length; i++) {
      if (curQuotes[i].likes > maxLikes) {
        maxLikes = curQuotes[i].likes;
      }
    }
    console.log(selectLikes, maxLikes);
    console.log(selectQuote);

    return {
      aQuote: selectQuote.quote,
      imageURL: curBook[0].imageURL,
      relRating: (selectLikes / maxLikes) * 0.5 + 0.5, // scale relative rating to be from 0.5 to 1
    };
  }, [book]);

  return (
    <div className="book-page">
      <h1>
        <span className="book-title">{book.name}</span>
      </h1>
      <div className="book-details">
        <img src={imageURL} />
        <div className="quote">
          <h3
            style={{ textShadow: `0px 0px 10px rgba(255,255,0,${relRating})` }}
          >
            Quote from <span className="book-title">{book.name}</span>:{" "}
          </h3>
          <p>
            <span
              style={{
                textShadow: `0px 0px 1px rgba(255,255,0,${relRating})`,
              }}
            >
              {aQuote}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Book;
