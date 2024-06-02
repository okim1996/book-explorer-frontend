import { useState } from "react";
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
  const openModal = () => {
    // dispatch(setBooks({ ...store, highlightCard: index }));
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dateString = bookInfo?.volumeInfo?.publishedDate;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div className={styles.overlay}>
      <p className={styles.text}>{bookInfo.volumeInfo.title}</p>
      <div onClick={openModal} className={styles["button-container"]}>
        <span className={styles.button}>View</span>
      </div>
      {/* <button onClick={openModal}>View</button> */}
      <Modal index={index} isOpen={isModalOpen} onClose={closeModal}>
        {/* <BookView index={index}></BookView> */}
      </Modal>
    </div>
  );
}
export default BookOverlayCard;
