import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import styles from "./BooksContainer.module.css";
function BooksContainer() {
  // Access the state from the Redux Store
  const booksState = useSelector((state) => state.books);

  // Log the state to the console for now
  return (
    <div className={styles["books-container"]}>
      {booksState.books.map((book, index) => (
        <BookCard key={index} bookInfo={book}></BookCard>
      ))}
    </div>
  );
}
export default BooksContainer;
