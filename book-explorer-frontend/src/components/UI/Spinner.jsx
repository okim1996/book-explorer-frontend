import React from "react";
import styles from "./Spinner.module.css"; // Import CSS module

const Spinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
