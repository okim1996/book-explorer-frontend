import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./PaginationNextSet.module.css";
function PaginationPrevSet({ store, setInputValue }) {
  const dispatch = useDispatch();
  const set = Math.ceil(store.currentPage / 4) - 1;

  const handleClick = () => {
    const amount =
      store.pages - store.currentPage >= 4
        ? 4
        : store.pages - store.currentPage;
    setInputValue(store.currentPage + amount);
    dispatch(setBooks({ ...store, currentPage: store.currentPage + amount }));
  };
  const handleLastPage = () => {
    setInputValue(store.pages);
    dispatch(setBooks({ ...store, currentPage: store.pages }));
  };
  return (
    <div className={styles.container}>
      {store.pages - set * 4 > 4 ? (
        <>
          <div
            onClick={() => handleClick()}
            className={`${styles["button-container"]}`}
          >
            <span className={styles.button}>. . .</span>
          </div>
          <div
            onClick={() => handleLastPage()}
            className={`${styles["button-container"]}`}
          >
            <span className={styles.button}>{store.pages}</span>
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.hidden} ${styles["button-container"]}`}>
            <span className={styles.button}>. . .</span>
          </div>
          <div className={`${styles.hidden} ${styles["button-container"]}`}>
            <span className={styles.button}>{store.pages}</span>
          </div>
        </>
      )}
    </div>
  );
}
export default PaginationPrevSet;
