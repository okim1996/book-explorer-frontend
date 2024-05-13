import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import styles from "./SearchBar.module.css";
import Spinner from "./Spinner";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(`this is page ${page}`);
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
  }, [searchTerm, page]);

  const handleChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };
  const handleListClick = (value) => {
    setSearchTerm(value);
  };

  const handlePage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <div className={styles.autocomplete}>
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
      {loading ? (
        <ul className={styles.suggestions}>
          <Spinner></Spinner>
        </ul>
      ) : (
        <ul className={styles.suggestions}>
          {searchResults.map((result, index) => (
            <li onClick={() => handleListClick(result)} key={index}>
              {result}
            </li>
          ))}
          {searchResults.length !== 0 ? (
            <li key={`nextButton${page}`} onClick={() => handlePage()}>
              Load More Suggestions
            </li>
          ) : (
            <li>No More Suggestions</li>
          )}
        </ul>
      )}
    </div>
  );
}
export default SearchBar;
