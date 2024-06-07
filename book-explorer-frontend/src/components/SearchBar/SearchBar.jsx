import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";

import styles from "./SearchBar.module.css";
import Spinner from "../UI/Spinner";
import MatchingText from "./MatchingText";
import SearchButton from "./SearchButton";
function SearchBar({ setBooksLoading }) {
  const store = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pressedEnter, setPressedEnter] = useState(false);
  const dropDownRef = useRef(null);
  const searchButtonRef = useRef(null);

  useEffect(() => {
    setSearchTerm(store.userInput);
  }, [store.userInput]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current.contains(event.target)) {
        if (event.target.id === "search-button") {
          setShowSuggestions(false);
        } else if (event.key === "Enter") {
          setShowSuggestions(false);
        } else {
          setShowSuggestions(true);
        }
      } else {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const endpoint = `https://oscarkim32.pythonanywhere.com/api/autoComplete/?columnName=${searchBy}&userInput=${searchTerm}&page=${page}`;
        const data = await fetchData(endpoint);
        setSearchResults(data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
  }, [searchTerm, page, searchBy]);

  const handleChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };
  const handleListClick = (value) => {
    setSearchTerm(value);
  };

  const handlePage = (e) => {
    e.stopPropagation();
    setPage(page + 1);
  };
  const handleEnterDown = async (event) => {
    if (event.key === "Enter") {
      try {
        // Construct the URL based on the searchTerm and searchBy
        const url = `https://oscarkim32.pythonanywhere.com/api/books/search?q=${
          searchBy === "ISBN" ? "" : "in"
        }${searchBy.toLowerCase()}:${searchTerm}`;

        // Send a GET request to the back-end

        const response = await fetch(url);
        response;
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
        };
        // Update the redux store with the received data
        dispatch(setBooks(payload));
        const element = document.getElementById("books-container");
        const topPosition = element.offsetTop;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth", // 'auto' for instant scroll, 'smooth' for smooth scroll
        });
        setBooksLoading(false);
      } catch (error) {
        // Handle errors here
        console.log("There was a problem with the fetch operation", error);
      }
    }
  };
  const handleEnterUp = (event) => {
    if (event.key === "Enter") {
      setBooksLoading(true);
    }
  };

  return (
    <div ref={dropDownRef} className={styles.autocomplete}>
      <div className={styles["search-bar"]}>
        <input
          id="focus-input"
          className={`${styles["input-field"]}`}
          type="text"
          placeholder={`Search By ${searchBy}`}
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          onKeyUp={(event) => handleEnterUp(event)}
          onKeyDown={(event) => handleEnterDown(event)}
        />
        <select
          className={styles["search-by"]}
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="ISBN">ISBN</option>
          <option value="Publisher">Publisher</option>
        </select>
      </div>
      <SearchButton
        setBooksLoading={setBooksLoading}
        pressedEnter={pressedEnter}
        setPressedEnter={setPressedEnter}
        searchTerm={searchTerm}
        searchBy={searchBy}
      ></SearchButton>
      {showSuggestions &&
        (loading ? (
          <ul className={styles.suggestions}>
            <Spinner></Spinner>
          </ul>
        ) : (
          <ul
            onMouseDown={(e) => e.stopPropagation()}
            className={styles.suggestions}
          >
            {searchResults.map((result, index) => (
              <MatchingText
                suggestion={result}
                userInput={searchTerm}
                key={index}
                handleClick={handleListClick}
              ></MatchingText>
            ))}
            {searchResults.length !== 0 ? (
              <li key={`nextButton${page}`} onClick={(e) => handlePage(e)}>
                Load More Suggestions
              </li>
            ) : (
              <li>No More Suggestions</li>
            )}
          </ul>
        ))}
    </div>
  );
}
export default SearchBar;
