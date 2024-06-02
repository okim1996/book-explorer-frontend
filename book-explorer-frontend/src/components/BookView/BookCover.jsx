import styles from "./BookCover.module.css";
import StarRating from "../UI/StarRating";
function BookCover({ bookInfo }) {
  const imageLink = bookInfo.volumeInfo?.imageLinks?.thumbnail;
  const rating = bookInfo?.volumeInfo?.averageRating;
  const ratingCount = bookInfo?.volumeInfo?.ratingsCount;

  return (
    <div className={styles.container}>
      <img
        src={imageLink === undefined ? "/images/missing_cover.png" : imageLink}
        alt={
          imageLink === undefined
            ? "Cover Not Available"
            : bookInfo.volumeInfo.title
        }
        className={styles.image}
      />
      {rating === undefined ? (
        <p>No User Ratings</p>
      ) : (
        <StarRating rating={rating} reviewCount={ratingCount}></StarRating>
      )}
    </div>
  );
}
export default BookCover;
