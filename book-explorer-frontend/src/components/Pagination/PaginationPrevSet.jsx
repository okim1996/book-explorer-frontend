import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./PaginationPrevSet.module.css";

function PaginationPrevSet({ store, setInputValue }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    setInputValue(store.currentPage - 4);
    dispatch(setBooks({ ...store, currentPage: store.currentPage - 4 }));
  };
  const handleFirstPage = () => {
    setInputValue(1);
    dispatch(setBooks({ ...store, currentPage: 1 }));
  };
  return (
    <div className={styles.container}>
      {store.currentPage > 4 ? (
        <>
          <button onClick={() => handleFirstPage()}>1</button>{" "}
          <button onClick={() => handleClick()}>. . .</button>{" "}
        </>
      ) : (
        <>
          <button className={styles.hidden}>1</button>
          <button className={styles.hidden}>. . .</button>
        </>
      )}
    </div>
  );
}
export default PaginationPrevSet;
