import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setBooks } from "../../store/booksSlice";
import { fetchData } from "../../utils/api";
import PaginationPrev from "./PaginationPrev";
import PaginationNext from "./PaginationNext";
import PaginationPrevSet from "./PaginationPrevSet";
import PaginationNextSet from "./PaginationNextSet";
import PaginationRow from "./PaginationRow";
import LoadMore from "./LoadMore";
import styles from "./PaginationBar.module.css";
import { current } from "@reduxjs/toolkit";

function PaginationBar() {
  // Access the state from the Redux Store
  const store = useSelector((state) => state.books);
  const [inputValue, setInputValue] = useState(store.pages);
  // const [currentPage, setCurrentPage] = useState(1);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(store.pages);
  }, [store.pages]);
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // Check if the new value matches the number pattern
    if (/^[0-9]*$/.test(newValue)) {
      setInputValue(Number(newValue));
    }
  };
  const handleButtonClick = () => {
    dispatch(setBooks({ ...store, currentPage: Number(inputValue) }));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputValue > 0 && inputValue <= store.pages) {
        setInputValue(Number(inputValue));
        dispatch(setBooks({ ...store, currentPage: Number(inputValue) }));
      }
    }
  };

  return (
    <>
      {store.pages === 0 ? (
        <div></div>
      ) : (
        <div className={styles["pagination-container"]}>
          <PaginationPrev
            store={store}
            inputValue={inputValue}
            setInputValue={setInputValue}
          ></PaginationPrev>
          <PaginationPrevSet
            store={store}
            setInputValue={setInputValue}
          ></PaginationPrevSet>
          <PaginationRow
            store={store}
            inputValue={inputValue}
            setInputValue={setInputValue}
          ></PaginationRow>
          <PaginationNextSet
            store={store}
            setInputValue={setInputValue}
          ></PaginationNextSet>
          <PaginationNext
            store={store}
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
          <div className={styles.align}>
            <span>/ {store.pages}</span>
          </div>
          <div
            onClick={handleButtonClick}
            className={`${styles["button-container"]} ${
              inputValue > 0 && inputValue <= store.pages
                ? ""
                : styles["disable-button"]
            }`}
          >
            <span className={styles.button}>Confirm</span>
          </div>
          <LoadMore></LoadMore>
        </div>
      )}
    </>
  );
}
export default PaginationBar;
