import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./PaginationBar.module.css";
function PaginationBar() {
  // Access the state from the Redux Store
  const { pages: totalPages } = useSelector((state) => state.books);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const set = Math.ceil(currentPage / 4) - 1;
  let remainder = currentPage % 4;
  if (remainder === 0) remainder = 4;
  const value = set * 4 + remainder;
  console.log(currentPage, "  ", set, "    ", remainder);
  let pagesRow = [];
  pagesRow.push(set * 4 + 1);
  pagesRow.push(set * 4 + 2);
  pagesRow.push(set * 4 + 3);
  pagesRow.push(set * 4 + 4);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleClickPage = (event) => {
    setCurrentPage(Number(event.target.innerHTML));
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // Check if the new value matches the number pattern
    if (/^[0-9]*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };
  const handleButtonClick = () => {
    setCurrentPage(inputValue);
  };

  //   return <div>{totalPages ? "" : "this is the empty pagination bar"}</div>;
  return (
    <div>
      <button onClick={() => handlePrev()}>prev</button>
      {pagesRow.map((page) => {
        if (page === value) {
          return (
            <p
              onClick={(event) => handleClickPage(event)}
              key={page}
              className={styles.bold}
            >
              {page}
            </p>
          );
        } else {
          return (
            <p onClick={(event) => handleClickPage(event)} key={page}>
              {page}
            </p>
          );
        }
      })}
      <button onClick={() => handleNext()}>next</button>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number..."
        pattern="[0-9]*"
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}
export default PaginationBar;
