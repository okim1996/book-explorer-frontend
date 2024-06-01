import styles from "./NumberResults.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";

function NumberResults() {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const start = (store.currentPage - 1) * store.showNum + 1;
  let end = store.currentPage * store.showNum;
  if (end > store.totalItems) {
    end = store.totalItems;
  }
  const clickHandler = (event) => {
    const value = Number(event.target.value);
    const newPages = Math.ceil(store.totalItems / value);
    dispatch(
      setBooks({ ...store, showNum: value, pages: newPages, currentPage: 1 })
    );
  };
  return (
    <div className={styles.container}>
      <p>{`Showing Results ${start} - ${end} of ${store.totalItems}`}</p>
      <select className={styles.options} name="number-results">
        <option onClick={(event) => clickHandler(event)} value={36}>
          Show: 36
        </option>
        <option onClick={(event) => clickHandler(event)} value={24}>
          Show: 24
        </option>
        <option onClick={(event) => clickHandler(event)} value={12}>
          Show: 12
        </option>
      </select>
    </div>
  );
}
export default NumberResults;
