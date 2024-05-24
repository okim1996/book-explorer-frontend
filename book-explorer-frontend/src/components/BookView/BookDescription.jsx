import styles from "./BookDescription.module.css";
function BookDescription({ bookInfo }) {
  const description = bookInfo?.volumeInfo?.description;
  return (
    <div className={styles.container}>
      <h4>Description</h4>
      <p>
        {description === undefined ? "Description Not Available." : description}
      </p>
    </div>
  );
}
export default BookDescription;
