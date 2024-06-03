import BookOverlayCard from "./BookOverlayCard";
import styles from "./BookCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import { useEffect } from "react";
function BookCard({ index, bookInfo }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const imageLink = store.books[index]?.volumeInfo?.imageLinks?.thumbnail;
  useEffect(() => {
    const currentPage = Math.ceil((store.modalIndex + 1) / store.showNum);
    console.log(
      `bookcard ${store.modalIndex + 1} , ${store.showNum} , ${currentPage} , ${
        store.currentPage
      }`
    );
    if (currentPage !== store.currentPage) {
      dispatch(setBooks({ ...store, currentPage: currentPage }));
    }
  }, [store.modalIndex]);
  return (
    <div
      className={`${styles["book-cell"]} ${
        store.modalIndex === index ? styles.highlight : ""
      }`}
    >
      <div className={styles["background-image"]}></div>
      <img
        className={styles["book-cover"]}
        src={imageLink === undefined ? "/images/missing_cover.png" : imageLink}
        alt={
          imageLink === undefined
            ? "Cover Not Available"
            : bookInfo.volumeInfo.title
        }
      />
      <BookOverlayCard index={index} bookInfo={bookInfo}></BookOverlayCard>
    </div>
  );
}
export default BookCard;
