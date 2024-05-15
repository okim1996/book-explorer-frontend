import React from "react";
import { useDispatch } from "react-redux";
import { setBooks } from "../store/booksSlice";
import styles from "./SearchButton.module.css";
function SearchButton({ searchTerm, searchBy }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      // Construct the URL based on the searchTerm and searchBy
      if (searchBy === "Title") {
        searchBy = "intitle:";
      }
      if (searchBy === "Author") {
        searchBy = "inauthor:";
      }
      if (searchBy === "ISBN") {
        searchBy = "isbn:";
      }
      if (searchBy === "Publisher") {
        searchBy = "inpublisher:";
      }
      const url = `http://127.0.0.1:8000/api/books/search?q=${searchBy}${searchTerm}`;

      // Send a GET request to the back-end

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the redux store with the received data
      dispatch(setBooks({ ...data, currentPage: 1 }));
    } catch (error) {
      // Handle errors here
      console.log("There was a problem with the fetch operation", error);
    }
  };
  return (
    <button id="search-button" className={styles.button} onClick={handleClick}>
      Search
    </button>
  );
}
export default SearchButton;
