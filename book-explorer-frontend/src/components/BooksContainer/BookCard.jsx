import BookOverlayCard from "./BookOverlayCard";
import styles from "./BookCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
function BookCard({ index, bookInfo }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  // const imageLink = bookInfo.volumeInfo?.imageLinks?.thumbnail;
  const imageLink = store.books[index]?.volumeInfo?.imageLinks?.thumbnail;
  return (
    <div
      className={`${styles["book-cell"]} ${
        store.highlightCard === index ? styles.highlight : ""
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
