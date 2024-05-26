import { useDispatch } from "react-redux";
import styles from "./PaginationPrev.module.css";

import { setBooks } from "../../store/booksSlice";
function PaginationPrev({ store, inputValue, setInputValue }) {
  const dispatch = useDispatch();
  const handlePrev = () => {
    setInputValue(Number(store.currentPage - 1));
    dispatch(
      setBooks({ ...store, currentPage: Number(store.currentPage - 1) })
    );
  };
  return (
    <button
      className={`${styles["pagination-button"]} ${
        store.currentPage === 1 ? styles["disable-button"] : ""
      }`}
      onClick={() => handlePrev()}
    >
      &larr;
    </button>
  );
}
export default PaginationPrev;
