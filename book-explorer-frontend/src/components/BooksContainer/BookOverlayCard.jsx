import { useState } from "react";
import Modal from "../Modal";
import StarRating from "../StarRating";
import BookHeading from "../BookView/BookHeading";
import BookCover from "../BookView/BookCover";
import BookDetails from "../BookView/BookDetails";
import BookDescription from "../BookView/BookDescription";
import styles from "./BookOverlayCard.module.css";
function BookOverlayCard({ bookInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(bookInfo);
  return (
    <div className={styles.overlay}>
      <p className={styles.text}>{bookInfo.volumeInfo.title}</p>
      <button onClick={openModal}>View</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <BookHeading bookInfo={bookInfo}></BookHeading> */}
        {/* <BookCover bookInfo={bookInfo}></BookCover> */}
        {/* <BookDetails bookInfo={bookInfo}></BookDetails> */}
        <BookDescription bookInfo={bookInfo}></BookDescription>
      </Modal>
    </div>
  );
}
export default BookOverlayCard;
