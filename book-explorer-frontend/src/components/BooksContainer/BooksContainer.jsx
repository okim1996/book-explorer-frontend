import SearchBar from "../SearchBar/SearchBar";
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
import NumberResults from "../Pagination/NumberResults";
import { current } from "@reduxjs/toolkit";
function BooksContainer() {
  // Access the state from the Redux Store
  const containerRef = useRef(null);
  const booksRef = useRef(null);
  const store = useSelector((state) => state.books);
  // const [highlight, setHighlight] = useState(store.highlightCard);
  const [searchYTarget, setSearchYTarget] = useState(10000);
  const [pageY, setPageY] = useState(0);
  const [pageBottom, setPageBottom] = useState(0);
  const [searchBottom, setSearchBottom] = useState(0);
  let currentIndex = Math.abs(store.currentPage - 1) * store.showNum;
  let endIndex = store.currentPage * store.showNum;
  // determine the top and bottom of the page y position on mousescroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setPageY(scrollPosition);
      setPageBottom(scrollPosition + viewportHeight);
    };
    // Add the event listener for scroll
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // determine the starting and ending y position of the scrolling-container component
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const yPosition = rect.top + window.scrollY; // Y position relative to the entire document
      setSearchYTarget(yPosition);
    }
    setTimeout(() => {
      const booksContainer = booksRef.current;
      if (booksContainer) {
        const rect = booksContainer.getBoundingClientRect();
        const yPosition = rect.bottom + window.scrollY; // Y position relative to the entire document
        setSearchBottom(yPosition);
      }
    }, 300);
  }, [store.currentPage, store.category, store.userInput, store.showNum]);

  // scroll the page to the books container on search and pagination
  useEffect(() => {
    const element = document.getElementById("books-container");
    const topPosition = element.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth", // 'auto' for instant scroll, 'smooth' for smooth scroll
    });
  }, [store.currentPage, store.category, store.userInput]);

  // figure out which set of books to render to the container
  useEffect(() => {
    currentIndex = Math.abs(store.currentPage - 1) * store.showNum;
    endIndex = store.currentPage * store.showNum;
  }, [store.currentPage]);
  let output = "";
  if (store.userInput === "") {
    output = <EmptyPage></EmptyPage>;
  } else {
    if (store.books.length !== 0) {
      output = (
        <div ref={containerRef} className={styles["scroll-container"]}>
          {!store.hideSticky && (
            <div
              className={`${styles["sticky-search"]} ${
                pageY >= searchYTarget ? "" : styles.hidden
              }`}
            >
              <SearchBar></SearchBar>
            </div>
          )}

          <NumberResults></NumberResults>
          <div ref={booksRef} className={styles["books-container"]}>
            {store.books.slice(currentIndex, endIndex).map((book, index) => {
              return (
                <BookCard
                  key={index}
                  index={currentIndex + index}
                  bookInfo={book}
                ></BookCard>
              );
            })}
          </div>
          <div
            className={`${styles["sticky-pagination"]} ${
              pageBottom < searchBottom + 20 ? "" : styles.hidden
            }`}
          >
            {!store.hideSticky && <PaginationBar></PaginationBar>}
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
      {output}
    </div>
  );
}
export default BooksContainer;
