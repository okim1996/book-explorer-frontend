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
  }

  const handleClickPage = (event) => {
    setInputValue(Number(event.target.innerHTML));
    dispatch(
      setBooks({ ...store, currentPage: Number(event.target.innerHTML) })
    );
  };

  return (
    <>
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
    </>
  );
}
export default PaginationRow;
