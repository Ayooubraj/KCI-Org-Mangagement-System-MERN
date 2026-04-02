import { createSlice } from "@reduxjs/toolkit";
import { getAllDonors } from "./donorHandle";

const donorSlice = createSlice({
  name: "donor",
  initialState: {
    donorsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDonors.fulfilled, (state, action) => {
        state.loading = false;
        state.donorsList = action.payload;
      })
      .addCase(getAllDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default donorSlice.reducer;