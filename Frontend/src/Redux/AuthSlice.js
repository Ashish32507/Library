import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    singleUser: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setLoading, setUser, setSingleUser } = AuthSlice.actions;
export default AuthSlice.reducer;
