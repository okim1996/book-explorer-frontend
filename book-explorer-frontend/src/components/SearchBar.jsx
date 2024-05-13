import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../utils/api";
import styles from "./SearchBar.module.css";
import Spinner from "./Spinner";
import MatchingText from "./MatchingText";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const dropDownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current.contains(event.target)) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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

  return (
    <div ref={dropDownRef} className={styles.autocomplete}>
      <input
        className={`${styles.inputField}`}
        type="text"
        placeholder={`Search By ${searchBy}`}
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
        <option value="Title">Title</option>
        <option value="Author">Author</option>
        <option value="ISBN">ISBN</option>
        <option value="Publisher">Publisher</option>
      </select>
      <button>Search</button>
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
