import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setBooks } from "../../store/booksSlice";
import { fetchData } from "../../utils/api";
import PaginationPrev from "./PaginationPrev";
import PaginationNext from "./PaginationNext";
import PaginationPrevSet from "./PaginationPrevSet";
import PaginationNextSet from "./PaginationNextSet";
import PaginationRow from "./PaginationRow";
import styles from "./PaginationBar.module.css";

function PaginationBar() {
  // Access the state from the Redux Store
  const {
    pages: totalPages,
    category,
    userInput,
  } = useSelector((state) => state.books);
  const [inputValue, setInputValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  const url = `http://127.0.0.1:8000/api/books/search?q=${category}${userInput}`;
  console.log(`this is the url from pagination bar ${url}`);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your effect code here
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          for (const key in data) {
            console.log(`paginationbar : ${key} : ${data[key]}`);
          }
          // dispatch(
          //   setBooks({
          //     ...data,
          //     currentPage: currentPage,
          //     category: category,
          //     userInput: userInput,
          //   })
          // );
        } catch (error) {
          console.log(error);
        }
      }, 300);

      return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
    }
  }, [currentPage]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     try {
  //       const endpoint = `http://127.0.0.1:8000/api/books/search/?q=${category}${userInput}&pageNumber=${currentPage}`;
  //       console.log(`this is the endpoint from paginationbar ${endpoint}`);
  //       const response = await fetch(endpoint);
  //       const data = await response.json();
  //       for (const key in data) {
  //         console.log(`paginationbar : ${key} : ${data[key]}`);
  //       }
  //       dispatch(
  //         setBooks({
  //           ...data,
  //           currentPage: currentPage,
  //           category: category,
  //           userInput: userInput,
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 300);

  //   return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
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
      if (inputValue > 0 && inputValue <= totalPages) {
        setCurrentPage(Number(inputValue));
        setInputValue(Number(inputValue));
      }
    }
  };

  return (
    <>
      {totalPages === 0 ? (
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
            totalPages={totalPages}
          ></PaginationRow>
          <PaginationNextSet
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setInputValue={setInputValue}
          ></PaginationNextSet>
          <PaginationNext
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          ></PaginationNext>
          <input
            className={`${
              inputValue > 0 && inputValue <= totalPages
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
          / {totalPages}
          <button
            className={`${
              inputValue > 0 && inputValue <= totalPages
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
