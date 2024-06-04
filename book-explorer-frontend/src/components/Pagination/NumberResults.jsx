import styles from "./NumberResults.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import { useEffect, useState } from "react";

function NumberResults() {
  const store = useSelector((state) => state.books);
  const [selectValue, setSelectValue] = useState(store.showNum);
  const dispatch = useDispatch();
  const start = (store.currentPage - 1) * store.showNum + 1;
  let end = store.currentPage * store.showNum;
  if (end > store.totalItems) {
    end = store.totalItems;
  }
  useEffect(() => {
    setSelectValue(36);
  }, [store.userInput, store.books]);
  const selectHandler = (event) => {
    const value = Number(event.target.value);
    const newPages = Math.ceil(store.totalItems / value);
    dispatch(
      setBooks({ ...store, showNum: value, pages: newPages, currentPage: 1 })
    );
    setSelectValue(value);
  };
  return (
    <div className={styles.container}>
      <p
        className={styles.text}
      >{`Showing Results ${start} - ${end} of ${store.totalItems}`}</p>
      <select
        className={styles.options}
        name="number-results"
        value={selectValue}
        onChange={(event) => selectHandler(event)}
      >
        <option value={36}>Show: 36</option>
        <option value={24}>Show: 24</option>
        <option value={12}>Show: 12</option>
      </select>
    </div>
  );
}
export default NumberResults;
