import styles from "./EmptyPage.module.css";

function EmptyPage() {
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
        <h2 className={styles.text}>Empty Query!</h2>
        <p className={styles.text}>
          We apologize for the inconvenience, but it appears that the query you
          entered is empty.
        </p>
        <div onClick={clickHandler} className={styles["button-container"]}>
          <span className={styles.button}>Try Again?</span>
        </div>
        <div className={styles["image-container"]}>
          <img
            className={styles.image}
            src="images/empty-query.png"
            alt="Your query is empty!"
          />
        </div>
      </div>
    </div>
  );
}
export default EmptyPage;
