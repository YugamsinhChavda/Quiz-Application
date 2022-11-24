import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    Setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { Setuser } = userSlice.actions;
export default userSlice.reducer;
