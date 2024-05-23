import React from "react";
import styles from "./StarRating.module.css";

const StarRating = ({ rating, reviewCount }) => {
  // Generate an array of 5 elements for the stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillWidth = Math.trunc(
      Math.min(Math.max(rating - index, 0), 1) * 100
    );
    return (
      <span
        key={index}
        className={`${styles.star} ${
          fillWidth === 100 ? styles.filled : styles.partial
        }`}
        style={{ "--fill-width": `${fillWidth}%` }}
      >
        &#9733;
      </span>
    );
  });
  return (
    <div>
      <div className={styles["star-container"]}>{stars}</div>
      <div>{reviewCount} reviews</div>
    </div>
  );
};

export default StarRating;
