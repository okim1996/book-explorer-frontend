import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  pages: 0,
  totalItems: 0,
  currentPage: 1,
  category: "",
  userInput: "",
  noMore: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      const {
        books,
        pages,
        totalItems,
        currentPage,
        category,
        userInput,
        hasData,
        noMore,
      } = action.payload;
      state.books = books;
      state.pages = pages;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
      state.category = category;
      state.userInput = userInput;
      state.hasData = hasData;
      state.noMore = noMore;
    },
  },
});

export const { setBooks, setPage } = booksSlice.actions;

export default booksSlice.reducer;
