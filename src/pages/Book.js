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
  let someQuotes = [];
  const [quote, setQuotes] = useState("");
  useEffect(() => {
    axios
      .get(`https://the-one-api.dev/v2/book/${id}`, headers)
      .then(function (response) {
        setBook(response.data.docs[0]);
      })
      .catch(function (error) {
        setBook({});
      });
  }, []);

  const { aQuote, imageURL, relQuoteLen } = useMemo(() => {
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

    // let totalLen = 0;
    // for (let i = 0; i < curQuotes.length - 1; i = i + 1) {
    //   totalLen += curQuotes[i].quote.length;
    // }
    // let avgQuoteLen = totalLen / curQuotes.length;

    // let maxLen = 1;
    // for (let i = 0; i < curQuotes.length - 1; i++) {
    //   if (curQuotes[i].quote.length > maxLen) {
    //     maxLen = curQuotes[i].quote.length;
    //   }
    // }
    // console.log(maxLen);

    let maxLikes = 0;
    let selectLikes = selectQuote.likes | 0;
    for (let i = 0; i < curQuotes.length; i++) {
      if (curQuotes[i].likes > maxLikes) {
        maxLikes = curQuotes[i].likes;
      }
    }
    console.log(selectLikes, maxLikes);

    return {
      aQuote: selectQuote.quote,
      imageURL: curBook.imageURL,
      // relQuoteLen:
      //   selectQuote.length / avgQuoteLen > 1
      //     ? 1
      //     : selectQuote.length / avgQuoteLen,

      // selectQuote.length / maxLen,
      relRating: selectLikes / maxLikes,
    };
  }, [book]);

  console.log();

  return (
    <div>
      <h1>{book.name}</h1>
      <image src={imageURL} />
      <div
        className="book-quote"
        style={{ backgroundColor: `rgba(255,255,0,1-${1}` }}
      >
        <p>
          Quote from <span className="book-title">{book.name}</span>: {aQuote}
        </p>
      </div>
    </div>
  );
}
export default Book;
