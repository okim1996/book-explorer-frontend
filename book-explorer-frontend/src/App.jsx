import "./App.css";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import PaginationBar from "./components/Pagination/PaginationBar";
import LoadMore from "./components/Pagination/LoadMore";
import Title from "./components/UI/Title";
import SearchSection from "./components/SearchSection/SearchSection";
import { useState } from "react";
function App() {
  const [booksLoading, setBooksLoading] = useState(false);
  console.log(`app ${booksLoading}`);
  return (
    <div id="main-application" className={styles["main-application-container"]}>
      <div className={styles["search-section"]}>
        <Title></Title>
        <SearchSection setBooksLoading={setBooksLoading}></SearchSection>
      </div>
      <BooksContainer
        booksLoading={booksLoading}
        setBooksLoading={setBooksLoading}
      ></BooksContainer>
    </div>
  );
}

export default App;
