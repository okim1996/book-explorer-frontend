import styles from "./BookOverlayCard.module.css";
function BookOverlayCard({ bookInfo }) {
  console.log(bookInfo);
  return (
    <div className={styles.overlay}>
      <p>{bookInfo.volumeInfo.title}</p>
      <button>View</button>
    </div>
  );
}
export default BookOverlayCard;
