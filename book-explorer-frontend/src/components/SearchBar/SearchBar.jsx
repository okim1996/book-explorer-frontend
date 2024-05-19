import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";

import styles from "./SearchBar.module.css";
import Spinner from "../Spinner";
import MatchingText from "./MatchingText";
import SearchButton from "./SearchButton";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [pressedEnter, setPressedEnter] = useState(false);
  const dropDownRef = useRef(null);
  const searchButtonRef = useRef(null);
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
        const endpoint = `http://127.0.0.1:8000/api/autoComplete/?columnName=${searchBy}&userInput=${searchTerm}&page=${page}`;
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
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
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
      } catch (error) {
        // Handle errors here
        console.log("There was a problem with the fetch operation", error);
      }
    }
  };

  return (
    <div ref={dropDownRef} className={styles.autocomplete}>
      <input
        className={`${styles.inputField}`}
        type="text"
        placeholder={`Search By ${searchBy}`}
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={(event) => handleKeyPress(event)}
      />
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
        <option value="Title">Title</option>
        <option value="Author">Author</option>
        <option value="ISBN">ISBN</option>
        <option value="Publisher">Publisher</option>
      </select>
      <SearchButton
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
