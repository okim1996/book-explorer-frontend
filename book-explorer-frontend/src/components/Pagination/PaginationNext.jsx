import { useDispatch } from "react-redux";
import styles from "./PaginationNext.module.css";
import { setBooks } from "../../store/booksSlice";
function PaginationNext({ store, inputValue, setInputValue }) {
  const dispatch = useDispatch();

  const handleNext = () => {
    setInputValue(Number(store.currentPage + 1));
    dispatch(setBooks({ ...store, currentPage: store.currentPage + 1 }));
  };
  return (
    <button
      className={`${
        store.currentPage === store.pages ? styles["disable-button"] : ""
      }`}
      onClick={() => handleNext()}
    >
      &rarr;
    </button>
  );
}
export default PaginationNext;
