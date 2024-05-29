import styles from "./WrongQuery.module.css";
function WrongQuery() {
  const clickHandler = () => {
    const element = document.getElementById("main-application");
    const topPosition = element.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth", // 'auto' for instant scroll, 'smooth' for smooth scroll
    });
    const inputElement = document.getElementById("focus-input");
    if (inputElement) {
      inputElement.focus();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.text}>Books Not Found!</h2>
        <p className={styles.text}>
          We apologize for the inconvenience, but it appears that we could not
          find any books that match your query.
        </p>
        <div onClick={clickHandler} className={styles["button-container"]}>
          <span className={styles.button}>Try Again?</span>
        </div>
        <div className={styles["image-container"]}>
          <img
            className={styles.image}
            src="images/not-found-query.png"
            alt="Your query is empty!"
          />
        </div>
      </div>
    </div>
  );
}
export default WrongQuery;
