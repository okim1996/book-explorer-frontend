import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  pages: 0,
  totalItems: 0,
  currentPage: 1,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      const { books, pages, totalItems, currentPage } = action.payload;
      state.books = books;
      state.pages = pages;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
    },
  },
});

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;
