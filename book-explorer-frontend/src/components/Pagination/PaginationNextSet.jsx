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
          <button onClick={() => handleClick()}>. . .</button>
          <button onClick={() => handleLastPage()}>{store.pages}</button>
        </>
      ) : (
        <>
          <button className={styles.hidden}></button>
          <button className={styles.hidden}></button>
        </>
      )}
    </div>
  );
}
export default PaginationPrevSet;
