import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replacing the state with the new user data
    },
    // setLoading: (state, action) => {
    //     state.isLoading = action.payload
    // },
    // setError: (state, action) => {
    //     state.error = action.payload
    // }
  },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;
