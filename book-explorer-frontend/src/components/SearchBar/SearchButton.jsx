import React from "react";
import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./SearchButton.module.css";
function SearchButton({ pressedEnter, setPressedEnter, searchTerm, searchBy }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      // Construct the URL based on the searchTerm and searchBy

      const url = `http://127.0.0.1:8000/api/books/search?q=${
        searchBy === "ISBN" ? "" : "in"
      }${searchBy.toLowerCase()}:${searchTerm}`;

      // Send a GET request to the back-end

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      for (const key in data) {
        console.log(`searchbutton : ${key} : ${data[key]}`);
      }
      // Update the redux store with the received data
      dispatch(
        setBooks({
          ...data,
          currentPage: 1,
          category: searchBy,
          userInput: searchTerm,
        })
      );
      setPressedEnter(false);
    } catch (error) {
      // Handle errors here
      setPressedEnter(false);
      console.log("There was a problem with the fetch operation", error);
    }
  };
  // if (pressedEnter) handleClick();
  return (
    <button id="search-button" className={styles.button} onClick={handleClick}>
      Search
    </button>
  );
}
export default SearchButton;
