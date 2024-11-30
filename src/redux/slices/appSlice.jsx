import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: "",
  open: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    hideAlert: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { showAlert, hideAlert } = appSlice.actions;

export default appSlice.reducer;
