import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    AddRequest: (state, action) => {
      return action.payload;
    },
    RemoveRequest: (state, action) => {
      const removeArray = state.filter((ele) => ele._id !== action.payload);
      return removeArray;
    },
  },
});

export const { AddRequest, RemoveRequest } = requestSlice.actions;

export default requestSlice.reducer;
