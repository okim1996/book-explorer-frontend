import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import PaginationBar from "../Pagination/PaginationBar";
import LoadMore from "../Pagination/LoadMore";
import EmptyPage from "../UI/EmptyPage";
import WrongQuery from "../UI/WrongQuery";
import { setBooks } from "../../store/booksSlice";
import styles from "./BooksContainer.module.css";
import Footer from "../UI/Footer";
function BooksContainer() {
  // Access the state from the Redux Store
  const store = useSelector((state) => state.books);
  let currentIndex = Math.abs(store.currentPage - 1) * 36;
  let endIndex = store.currentPage * 36;
  useEffect(() => {
    const element = document.getElementById("books-container");
    const topPosition = element.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth", // 'auto' for instant scroll, 'smooth' for smooth scroll
    });
  }, [store.currentPage, store.category, store.userInput]);
  useEffect(() => {
    currentIndex = Math.abs(store.currentPage - 1) * 36;
    endIndex = store.currentPage * 36;
  }, [store.currentPage]);
  let output = "";
  if (store.userInput === "") {
    output = <EmptyPage></EmptyPage>;
  } else {
    if (store.books.length !== 0) {
      output = (
        <div className={styles["scroll-container"]}>
          <div className={styles["books-container"]}>
            {store.books.slice(currentIndex, endIndex).map((book, index) => (
              <BookCard key={index} bookInfo={book}></BookCard>
            ))}
          </div>
          <PaginationBar></PaginationBar>
        </div>
      );
    } else {
      output = <WrongQuery></WrongQuery>;
    }
  }
  return (
    <div
      id="books-container"
      className={`${styles["main-container"]} ${
        store.category === "" ? styles.hidden : ""
      }`}
    >
      {/* <div className={styles["scroll-container"]}></div> */}
      {output}
      {/* <Footer></Footer> */}
    </div>
  );
}
export default BooksContainer;
