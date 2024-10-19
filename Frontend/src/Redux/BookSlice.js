import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    allBooks: [],
    singleBook: null,
  },
  reducers: {
    setAllBooks: (state, action) => {
      state.allBooks = action.payload;
    },
    setSingleBook: (state, action) => {
      state.singleBook = action.payload;
    },
  },
});

export const { setAllBooks, setSingleBook } = bookSlice.actions;
export default bookSlice.reducer;
