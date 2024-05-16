import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BooksContainer from "./components/BooksContainer";
import PaginationBar from "./components/PaginationBar";
function App() {
  return (
    <div>
      <SearchBar></SearchBar>
      <BooksContainer></BooksContainer>
      <PaginationBar></PaginationBar>
    </div>
  );
}

export default App;
