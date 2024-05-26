import { useDispatch } from "react-redux";
import styles from "./PaginationRow.module.css";
import { setBooks } from "../../store/booksSlice";
function PaginationRow({ store, inputValue, setInputValue }) {
  const dispatch = useDispatch();
  const set = Math.ceil(store.currentPage / 4) - 1;
  let remainder = store.currentPage % 4;
  if (remainder === 0) remainder = 4;
  const value = set * 4 + remainder;
  let pagesRow = [];
  for (let i = 1; i <= 4; i++) {
    if (set * 4 + i <= store.pages) pagesRow.push(set * 4 + i);
    else pagesRow.push(false);
  }

  const handleClickPage = (event) => {
    const spanElement = event.currentTarget.querySelector("span");
    const number = Number(spanElement.textContent);
    setInputValue(number);
    dispatch(setBooks({ ...store, currentPage: number }));
  };

  return (
    <>
      {pagesRow.map((page, index) => {
        if (page === value) {
          return (
            <div
              key={index}
              onClick={(event) => handleClickPage(event)}
              className={`${styles.bold} ${styles["button-container"]}`}
            >
              <span className={styles.button}>{page}</span>
            </div>
          );
        } else if (page === false) {
          return (
            <div
              className={`${styles.hidden} ${styles["button-container"]}`}
              key={index}
            >
              <span className={styles.button}>{page}</span>
            </div>
          );
        } else {
          return (
            <div
              className={`${styles["button-container"]}`}
              onClick={(event) => handleClickPage(event)}
              key={index}
            >
              <span className={styles.button}>{page}</span>
            </div>
          );
        }
      })}
    </>
  );
}
export default PaginationRow;
