import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./SearchButton.module.css";
function SearchButton({ pressedEnter, setPressedEnter, searchTerm, searchBy }) {
  const store = useSelector((state) => state.books);
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
      const payload = {
        clickCounter: store.clickCounter + 1,
        books: data.books,
        pages: 1,
        totalItems: 36,
        currentPage: 1,
        category: searchBy,
        userInput: searchTerm,
        noMore: false,
      };
      // Update the redux store with the received data
      dispatch(setBooks(payload));
      setPressedEnter(false);
      // const element = document.getElementById("books-container");
      // const topPosition = element.offsetTop;
      // window.scrollBy({
      //   top: window.innerHeight,
      //   behavior: "smooth",
      // });
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
