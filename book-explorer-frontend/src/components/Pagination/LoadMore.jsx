import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./LoadMore.module.css";
function LoadMore() {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/books/search?q=${
        store.category === "ISBN" ? "" : "in"
      }${store.category.toLowerCase()}:${store.userInput}&pageNumber=${
        store.pages + 1
      }`;
      const response = await fetch(url);
      const data = await response.json();
      let payload = {
        books: [...store.books, ...data.books],
        pages: store.pages + 1,
        totalItems: store.totalItems + 36,
        currentPage: store.pages + 1,
        category: store.category,
        userInput: store.userInput,
        currentIndex: store.currentIndex + 36,
        endIndex: store.endIndex + 36,
        noMore: data.books.length === 0 ? true : false,
      };
      if (data.books.length === 0) {
        payload = { ...store, noMore: true };
      }
      dispatch(setBooks(payload));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      {store.noMore ? (
        <div
          className={`${styles["button-container"]} ${styles["disable-button"]}`}
        >
          <span className={`${styles.button}`}>No More Results</span>
        </div>
      ) : (
        <div className={styles["button-container"]}>
          <span className={styles.button} onClick={handleClick}>
            Load More Results
          </span>
        </div>
      )}
    </div>
  );
}
export default LoadMore;
