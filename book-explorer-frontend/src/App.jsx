import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import PaginationBar from "./components/Pagination/PaginationBar";
import LoadMore from "./components/Pagination/LoadMore";
import Title from "./components/UI/Title";
function App() {
  const store = useSelector((state) => state.books);
  return (
    <div className="main-application-container">
      <Title></Title>
      <SearchBar></SearchBar>
      {!store.category ? <div></div> : <BooksContainer></BooksContainer>}
      {/* {store.books.length !== 0 && <PaginationBar></PaginationBar>}
      {store.books.length !== 0 && <LoadMore></LoadMore>} */}
    </div>
  );
}

export default App;
