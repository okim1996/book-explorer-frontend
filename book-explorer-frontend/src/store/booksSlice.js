import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  pages: 0,
  totalItems: 0,
  currentPage: 1,
  category: "",
  userInput: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      const { books, pages, totalItems, currentPage, category, userInput } =
        action.payload;
      state.books = books;
      state.pages = pages;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
      state.category = category;
      state.userInput = userInput;
    },
  },
});

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;
