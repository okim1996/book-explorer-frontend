import styles from "./BookDescription.module.css";
function BookDescription({ bookInfo }) {
  const description = bookInfo?.volumeInfo?.description;
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Description</h4>
      <div className={styles["description-container"]}>
        <p className={styles.description}>
          {description === undefined
            ? "Description Not Available."
            : description}
        </p>
      </div>
    </div>
  );
}
export default BookDescription;
