import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./SearchButton.module.css";
function SearchButton({ pressedEnter, setPressedEnter, searchTerm, searchBy }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const handleClick = () => {
    async function sendRequest() {
      try {
        // Construct the URL based on the searchTerm and searchBy
        const url = `https://oscarkim32.pythonanywhere.com/api/books/search?q=${
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
          totalItems: data.books.length,
          currentPage: 1,
          category: searchBy,
          userInput: searchTerm,
          showNum: 36,
          noMore: false,
          highlightCard: -1,
          hideSticky: false,
          modalIndex: 0,
          loadingBooks: false,
        };
        // Update the redux store with the received data
        dispatch(setBooks(payload));
        setPressedEnter(false);
        const element = document.getElementById("books-container");
        const topPosition = element.offsetTop;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth", // 'auto' for instant scroll, 'smooth' for smooth scroll
        });
      } catch (error) {
        // Handle errors here
        setPressedEnter(false);
        console.log("There was a problem with the fetch operation", error);
      }
    }
    dispatch(setBooks({ ...store, loadingBooks: true }));
    sendRequest();
  };
  // if (pressedEnter) handleClick();
  return (
    <button onClick={handleClick} id="search-button" className={styles.button}>
      Search
    </button>
  );
}
export default SearchButton;
