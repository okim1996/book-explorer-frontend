import BookOverlayCard from "./BookOverlayCard";
import Spinner from "../UI/Spinner";
import styles from "./BookCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
import { useEffect, useRef, useState } from "react";
function BookCard({ index, bookInfo }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideFrom, setSlideFrom] = useState("");
  const slideRef = useRef();
  const imageLink = store.books[index]?.volumeInfo?.imageLinks?.thumbnail;
  // if (slideFrom === "right") {
  //   if (slideRef.current) {
  //     slideRef.current.classList.add(styles["slide-from-right"]);
  //   }
  // } else {
  //   if (slideRef.current) {
  //     slideRef.current.classList.add(styles["slide-from-left"]);
  //   }
  // }
  // useEffect(() => {
  //   if (slideRef.current) {
  //     slideRef.current.classList.remove(styles["slide-from-left"]);
  //     slideRef.current.classList.remove(styles["slide-from-right"]);
  //   }
  //   setCurrentPage(store.currentPage);
  //   if (store.currentPage > currentPage) {
  //     if (slideRef.current) {
  //       setSlideFrom("right");
  //     }
  //   } else {
  //     if (slideRef.current) {
  //       setSlideFrom("left");
  //     }
  //   }
  // }, [store.currentPage]);
  const loadingCard = (
    <div className={styles["book-cell"]}>
      <Spinner></Spinner>
    </div>
  );
  return (
    <>
      {store.loadingBooks ? (
        loadingCard
      ) : (
        <div
          ref={slideRef}
          className={`${styles["book-cell"]} ${
            store.modalIndex === index ? styles.highlight : ""
          }`}
        >
          <div className={styles["background-image"]}></div>
          <img
            className={styles["book-cover"]}
            src={
              imageLink === undefined ? "/images/missing_cover.png" : imageLink
            }
            alt={
              imageLink === undefined
                ? "Cover Not Available"
                : bookInfo.volumeInfo.title
            }
          />
          <BookOverlayCard index={index} bookInfo={bookInfo}></BookOverlayCard>
        </div>
      )}
    </>
  );
}
export default BookCard;
