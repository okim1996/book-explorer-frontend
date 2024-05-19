import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setPage } from "../../store/booksSlice";
import { fetchData } from "../../utils/api";
import PaginationPrev from "./PaginationPrev";
import PaginationNext from "./PaginationNext";
import PaginationPrevSet from "./PaginationPrevSet";
import PaginationNextSet from "./PaginationNextSet";
import PaginationRow from "./PaginationRow";
import styles from "./PaginationBar.module.css";
import { current } from "@reduxjs/toolkit";

function PaginationBar() {
  // Access the state from the Redux Store
  const store = useSelector((state) => state.books);
  const [inputValue, setInputValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const dispatch = useDispatch();
  for (const key in store) {
    console.log(`this is from paginationbar ${key}: ${store[key]}`);
  }
  useEffect(() => {
    if (store.category !== "") {
      try {
        async function retrieve() {
          const url = `http://127.0.0.1:8000/api/books/search?q=${
            store.category === "ISBN" ? "" : "in"
          }${store.category.toLowerCase()}:${
            store.userInput
          }&pageNumber=${currentPage}`;
          console.log(url);
          const response = await fetch(url);
          const data = await response.json();
          dispatch(
            setPage({
              books: data.books,
              newPage: currentPage,
            })
          );
        }
        retrieve();
        console.log(`this is the current page ${currentPage}`);
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentPage]);

  // useEffect(async () => {
  //   if (store.category !== "") {
  //     try {
  //       const url = `http://127.0.0.1:8000/api/books/search?q=${
  //         store.category === "ISBN" ? "" : "in"
  //       }${store.category.toLowerCase()}:${store.userInput}&pageNumber=${
  //         store.currentPage
  //       }`;
  //       console.log(url);
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       dispatch(
  //         setPage({
  //           books: data.books,
  //           newPage: currentPage,
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [currentPage]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // Check if the new value matches the number pattern
    if (/^[0-9]*$/.test(newValue)) {
      setInputValue(Number(newValue));
    }
  };
  const handleButtonClick = () => {
    setCurrentPage(Number(inputValue));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputValue > 0 && inputValue <= store.pages) {
        setCurrentPage(Number(inputValue));
        setInputValue(Number(inputValue));
      }
    }
  };

  return (
    <>
      {store.pages === 0 ? (
        <div></div>
      ) : (
        <div>
          <PaginationPrev
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          ></PaginationPrev>
          <PaginationPrevSet
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setInputValue={setInputValue}
          ></PaginationPrevSet>
          <PaginationRow
            currentPage={currentPage}
            inputValue={inputValue}
            setCurrentPage={setCurrentPage}
            setInputValue={setInputValue}
            pages={store.pages}
          ></PaginationRow>
          <PaginationNextSet
            pages={store.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setInputValue={setInputValue}
          ></PaginationNextSet>
          <PaginationNext
            pages={store.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          ></PaginationNext>
          <input
            className={`${
              inputValue > 0 && inputValue <= store.pages
                ? ""
                : styles["input-wrong"]
            }`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(event) => handleKeyPress(event)}
            placeholder="Enter a number..."
            pattern="[0-9]*"
          />
          / {store.pages}
          <button
            className={`${
              inputValue > 0 && inputValue <= store.pages
                ? ""
                : styles["disable-button"]
            }`}
            onClick={handleButtonClick}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
export default PaginationBar;
