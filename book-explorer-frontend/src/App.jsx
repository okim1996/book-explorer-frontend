import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import PaginationBar from "./components/Pagination/PaginationBar";
import LoadMore from "./components/LoadMore";
function App() {
  const store = useSelector((state) => state.books);

  return (
    <div>
      <SearchBar></SearchBar>
      {store.userInput !== "" && <BooksContainer></BooksContainer>}
      {store.books.length !== 0 && <PaginationBar></PaginationBar>}
      {store.books.length !== 0 && <LoadMore></LoadMore>}
    </div>
  );
}

export default App;
