import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    // removeConnection: (state, action) => {
    //   return state.filter((connection) => connection._id !== action.payload);
    // },
  },
  // other slice logic...
});
export const { addConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
