import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickCounter: 0,
  books: [],
  pages: 0,
  totalItems: 0,
  currentPage: 1,
  category: "",
  userInput: "",
  noMore: false,
  showNum: 36,
  highlightCard: 0,
  hideSticky: false,
  modalIndex: 1,
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
        clickCounter,
        showNum,
        highlightCard,
        hideSticky,
        modalIndex,
      } = action.payload;
      state.books = books;
      state.pages = pages;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
      state.category = category;
      state.userInput = userInput;
      state.hasData = hasData;
      state.noMore = noMore;
      state.clickCounter = clickCounter;
      state.showNum = showNum;
      state.highlightCard = highlightCard;
      state.hideSticky = hideSticky;
      state.modalIndex = modalIndex;
    },
  },
});

export const { setBooks, setPage } = booksSlice.actions;

export default booksSlice.reducer;
