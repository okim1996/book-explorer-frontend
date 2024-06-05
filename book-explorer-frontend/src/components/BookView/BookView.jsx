import BookCover from "./BookCover";
import BookDetails from "./BookDetails";
import BookDescription from "./BookDescription";
import BookHeading from "./BookHeading";
import styles from "./BookView.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
function BookView() {
  const store = useSelector((state) => state.books);
  const bookInfo = store.books[store.modalIndex];
  // return (
  //   <div className={styles["main-container"]}>
  //     <div className={styles["top-row"]}>
  //       <BookCover bookInfo={bookInfo}></BookCover>
  //       <div className={styles["details-container"]}>
  //         <BookHeading bookInfo={bookInfo}></BookHeading>
  //         <BookDetails bookInfo={bookInfo}></BookDetails>
  //       </div>
  //     </div>
  //     <div className={styles["horizontal-line"]}></div>
  //     <BookDescription bookInfo={bookInfo}></BookDescription>
  //   </div>
  // );
  return (
    <div className={styles.container}>
      <BookCover bookInfo={bookInfo}></BookCover>
      <BookHeading bookInfo={bookInfo}></BookHeading>
      <BookDetails bookInfo={bookInfo}></BookDetails>
      <BookDescription bookInfo={bookInfo}></BookDescription>
    </div>
  );
}
export default BookView;
