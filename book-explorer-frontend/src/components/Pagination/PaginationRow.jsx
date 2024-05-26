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
    setInputValue(Number(event.target.innerHTML));
    dispatch(
      setBooks({ ...store, currentPage: Number(event.target.innerHTML) })
    );
  };

  return (
    <>
      {pagesRow.map((page, index) => {
        if (page === value) {
          return (
            <button
              onClick={(event) => handleClickPage(event)}
              key={index}
              className={styles.bold}
            >
              {page}
            </button>
          );
        } else if (page === false) {
          return (
            <button className={styles.hidden} key={index}>
              1
            </button>
          );
        } else {
          return (
            <button onClick={(event) => handleClickPage(event)} key={index}>
              {page}
            </button>
          );
        }
      })}
    </>
  );
}
export default PaginationRow;
