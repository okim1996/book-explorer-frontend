import React from "react";
import styles from "./Title.module.css";
function Title() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Book Explorer</h1>
      </div>
      <hr className={styles["horizontal-line"]} />
    </>
  );
}
export default Title;
