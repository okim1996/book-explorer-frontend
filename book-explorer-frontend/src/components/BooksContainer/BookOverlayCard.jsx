import { useState } from "react";
import Modal from "../UI/Modal";
import StarRating from "../UI/StarRating";
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
  const dateString = bookInfo?.volumeInfo?.publishedDate;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // console.log(`${dateString} : ${typeof dateString}`);
  return (
    <div className={styles.overlay}>
      <p className={styles.text}>{bookInfo.volumeInfo.title}</p>
      <button onClick={openModal}>View</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <FixedSizeContainer> */}
        <BookHeading bookInfo={bookInfo}></BookHeading>
        <div className={styles["middle-row"]}>
          <BookCover bookInfo={bookInfo}></BookCover>
          <BookDetails bookInfo={bookInfo}></BookDetails>
        </div>
        <BookDescription bookInfo={bookInfo}></BookDescription>
        {/* </FixedSizeContainer> */}
      </Modal>
    </div>
  );
}
export default BookOverlayCard;
