import BookOverlayCard from "./BookOverlayCard";
import styles from "./BookCard.module.css";
function BookCard({ bookInfo }) {
  const imageLink = bookInfo.volumeInfo?.imageLinks?.thumbnail;
  return (
    <div className={styles["book-cell"]}>
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
      <BookOverlayCard bookInfo={bookInfo}></BookOverlayCard>
    </div>
  );
}
export default BookCard;
