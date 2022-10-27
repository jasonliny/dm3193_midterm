import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LOTR_API_KEY } from "../API_KEYS";
import lotrBookQuotes from "../components/lotr-book-quotes";

function BookListing() {
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
      .get(`https://the-one-api.dev/v2/book/${id}`)
      .then(function (response) {
        setBook(response.data.docs[0]);
        // console.log(response.data.docs[0].name);
        // quotes = lotrBookQuotes.filter(
        //   (aQuote) => aQuote.title === response.data.docs[0].name
        // );
      })
      .catch(function (error) {
        setBook({ name: "The Fellowship of the Ring" });
      });
  }, []);

  const { aQuote } = useMemo(() => {
    let title = book.name || "";
    console.log("title:", title);
    console.log(
      "check title=='fellowship..'",
      title.toLowerCase() == "The Fellowship Of the Ring".toLowerCase()
    );
    let allQuotes = lotrBookQuotes;
    console.log("all:", allQuotes);
    console.log(
      "filter:",
      allQuotes.filter(
        (someQuote) => someQuote.title.toLowerCase() == title.toLowerCase()
      )
    );
    // let curQuotes = allQuotes.filter(
    //   (someQuote) => someQuote.title == "The Fellowship of the Ring"
    // );
    let curQuotes = allQuotes.filter(
      (someQuote) => someQuote.title.toLowerCase() == title.toLowerCase()
    );
    console.log("cur:", curQuotes);
    if (curQuotes.length == 0) {
      curQuotes = [""];
    }
    // curQuotes = curQuotes || [""];
    // console.log(
    //   allQuotes.filter((quote) => quote.title == "The Fellowship of the Ring")
    // );
    let randInd = Math.floor(curQuotes.length * Math.random());
    console.log("ind:", randInd);
    return {
      aQuote: curQuotes[Math.floor(curQuotes.length * Math.random())].quote,
    };
  }, [book]);

  //   useEffect(() => {
  //     console.log("title:", book.name);
  //     let allQuotes = lotrBookQuotes;
  //     console.log("all", allQuotes);
  //     let curQuotes = allQuotes.filter((quote) => quote.title == book.name) || [""];
  //     console.log("cur:", curQuotes);
  //     let quote = curQuotes[Math.floor(curQuotes.length * Math.random())].quote;
  //     setQuotes(quote);
  //     // setQuotes(
  //     //   lotrBookQuotes.filter(
  //     //     (curQuote) => curQuote.title == "The Fellowship of the Ring"
  //     //   )[0].quote
  //     // );
  //   }, [book]);

  return (
    <div>
      <h1>{book.name}</h1>
      <p>Quote: {aQuote}</p>
    </div>
  );
}
export default BookListing;
