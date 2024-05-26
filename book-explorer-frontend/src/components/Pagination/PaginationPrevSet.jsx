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
          <div
            onClick={() => handleFirstPage()}
            className={styles["button-container"]}
          >
            <span className={styles["button"]}>1</span>{" "}
          </div>
          <div
            onClick={() => handleClick()}
            className={styles["button-container"]}
          >
            <span className={styles["button"]}>. . .</span>{" "}
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.hidden} ${styles["button-container"]}`}>
            <span className={styles.button}>1</span>
          </div>
          <div className={`${styles.hidden} ${styles["button-container"]}`}>
            <span className={styles.button}>. . .</span>
          </div>
        </>
      )}
    </div>
  );
}
export default PaginationPrevSet;
