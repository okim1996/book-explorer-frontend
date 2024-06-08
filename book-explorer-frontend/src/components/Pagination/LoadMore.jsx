import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import styles from "./LoadMore.module.css";
import Spinner from "../UI/Spinner";
function LoadMore() {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const handleClick = () => {
    async function sendRequest() {
      try {
        const url = `https://oscarkim32.pythonanywhere.com/api/books/search?q=${
          store.category === "ISBN" ? "" : "in"
        }${store.category.toLowerCase()}:${store.userInput}&pageNumber=${
          Math.ceil(store.totalItems / 36) + 1
        }`;
        const response = await fetch(url);
        // const start =
        //   (Math.ceil((store.totalItems + data.books.length) / store.showNum) -
        //     1) *
        //     store.showNum +
        //   1;
        const data = await response.json();
        let payload = {
          books: [...store.books, ...data.books],
          totalItems: store.totalItems + data.books.length,
          pages: Math.ceil(
            (store.totalItems + data.books.length) / store.showNum
          ),
          currentPage: Math.ceil(
            (store.totalItems + data.books.length) / store.showNum
          ),
          category: store.category,
          userInput: store.userInput,
          currentIndex: store.currentIndex + store.showNum,
          endIndex: store.endIndex + store.showNum,
          noMore: data.books.length === 0 ? true : false,
          showNum: store.showNum,
          highlightCard: -1,
          hideSticky: false,
          modalIndex:
            (Math.ceil((store.totalItems + data.books.length) / store.showNum) -
              1) *
            store.showNum,
          loadingBooks: false,
        };
        if (data.books.length === 0) {
          dispatch(setBooks({ ...store, noMore: true, loadingBooks: false }));
        } else {
          dispatch(setBooks(payload));
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setBooks({ ...store, loadingBooks: true }));
    sendRequest();
  };
  const loadingButton = (
    <div className={styles.container}>
      <Spinner></Spinner>
    </div>
  );
  return (
    <>
      {
        <div
          onClick={handleClick}
          className={`${styles.container} ${
            store.noMore ? styles["disable-button"] : ""
          }`}
        >
          {store.noMore ? (
            <div className={`${styles["button-container"]}`}>
              <span className={`${styles.button}`}>No More Results</span>
            </div>
          ) : (
            <div className={styles["button-container"]}>
              <span className={styles.button}>Load More Results</span>
            </div>
          )}
          {/* {store.noMore ? "No More Results" : "Load More Results"} */}
        </div>
      }
    </>
  );
}
export default LoadMore;
