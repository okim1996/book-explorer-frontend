import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import PaginationBar from "./components/Pagination/PaginationBar";
function App() {
  const booksState = useSelector((state) => state.books);
  return (
    <div>
      <SearchBar></SearchBar>
      {booksState?.books && <BooksContainer></BooksContainer>}
      {booksState?.books && <PaginationBar></PaginationBar>}
    </div>
  );
}

export default App;
