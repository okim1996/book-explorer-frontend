import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import PaginationBar from "./components/Pagination/PaginationBar";
import LoadMore from "./components/Pagination/LoadMore";
import Title from "./components/UI/Title";
import SearchSection from "./components/SearchSection/SearchSection";
function App() {
  const store = useSelector((state) => state.books);
  return (
    <div className={styles["main-application-container"]}>
      <div className={styles["search-section"]}>
        <Title></Title>
        <SearchSection></SearchSection>
      </div>
      {/* <SearchBar></SearchBar> */}
      {!store.category ? <div></div> : <BooksContainer></BooksContainer>}
    </div>
  );
}

export default App;
