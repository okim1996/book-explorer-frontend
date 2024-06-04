import { useDispatch, useSelector } from "react-redux";
import styles from "./PaginationNext.module.css";
import { setBooks } from "../../store/booksSlice";
function PaginationNext({ inputValue, setInputValue }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.books);

  const handleNext = () => {
    setInputValue(Number(store.currentPage + 1));
    dispatch(setBooks({ ...store, currentPage: store.currentPage + 1 }));
  };
  return (
    <div
      className={`${styles.container} ${
        store.currentPage === store.pages ? styles["disable-button"] : ""
      }`}
      onClick={() => handleNext()}
    >
      <span className={styles.arrow}>&gt;</span>
    </div>
  );
}
export default PaginationNext;
