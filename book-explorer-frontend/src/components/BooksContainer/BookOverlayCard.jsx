import { useEffect, useRef, useState } from "react";
import Modal from "../UI/Modal";
import BookView from "../BookView/BookView";
import StarRating from "../UI/StarRating";
import BookHeading from "../BookView/BookHeading";
import BookCover from "../BookView/BookCover";
import BookDetails from "../BookView/BookDetails";
import BookDescription from "../BookView/BookDescription";
import styles from "./BookOverlayCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/booksSlice";
function BookOverlayCard({ index, bookInfo }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const overlayRef = useRef();
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setTouched(false);
      }
    };
    if (touched) {
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [touched]);
  const openModal = () => {
    dispatch(setBooks({ ...store, hideSticky: true, modalIndex: index }));
    setIsModalOpen(true);
    setClicked(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const touchStartHandler = () => {
    setTouched(true);
  };
  const dateString = bookInfo?.volumeInfo?.publishedDate;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div
      className={`${styles.overlay} ${touched ? styles.show : ""}`}
      ref={overlayRef}
      onTouchStart={touchStartHandler}
    >
      <p className={styles.text}>{bookInfo.volumeInfo.title}</p>
      <div onClick={openModal} className={styles["button-container"]}>
        <span className={styles.button}>View</span>
      </div>
      <Modal index={index} isOpen={isModalOpen} onClose={closeModal}></Modal>
    </div>
  );
}
export default BookOverlayCard;
