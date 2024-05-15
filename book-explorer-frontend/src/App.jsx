import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BooksContainer from "./components/BooksContainer";
function App() {
  return (
    <div>
      <SearchBar></SearchBar>
      <BooksContainer></BooksContainer>
    </div>
  );
}

export default App;
