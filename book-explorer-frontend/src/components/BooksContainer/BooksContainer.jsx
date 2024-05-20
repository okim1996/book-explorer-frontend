import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import styles from "./BooksContainer.module.css";
function BooksContainer() {
  // Access the state from the Redux Store
  const store = useSelector((state) => state.books);
  let currentIndex = Math.abs(store.currentPage - 1) * 36;
  let endIndex = store.currentPage * 36;
  useEffect(() => {
    currentIndex = Math.abs(store.currentPage - 1) * 36;
    endIndex = store.currentPage * 36;
  }, [store.currentPage]);
  return (
    <div>
      {store.books.length !== 0 ? (
        <div className={styles["books-container"]}>
          {store.books.slice(currentIndex, endIndex).map((book, index) => (
            <BookCard key={index} bookInfo={book}></BookCard>
          ))}
        </div>
      ) : (
        <div>There are no books</div>
      )}
    </div>
  );
}
export default BooksContainer;
