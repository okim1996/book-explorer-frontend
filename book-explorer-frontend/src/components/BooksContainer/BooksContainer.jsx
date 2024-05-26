import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import PaginationBar from "../Pagination/PaginationBar";
import LoadMore from "../Pagination/LoadMore";
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
  if (store.userInput === "") return <div>Please Enter A Non-Empty Query</div>;
  return (
    <div className={styles["main-container"]}>
      {store.books.length !== 0 ? (
        <>
          <div className={styles["books-container"]}>
            {store.books.slice(currentIndex, endIndex).map((book, index) => (
              <BookCard key={index} bookInfo={book}></BookCard>
            ))}
          </div>
          <PaginationBar></PaginationBar>
          {/* <LoadMore></LoadMore> */}
        </>
      ) : (
        <div>There Are No Books That Match Your Query</div>
      )}
    </div>
  );
}
export default BooksContainer;
