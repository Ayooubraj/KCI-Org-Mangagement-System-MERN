// studentSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createStudent } from "./studentHandle"; // ✅ only import createStudent here

const initialState = {
  studentsList: [],
  loading: false,
  error: null,
  response: null,
  statestatus: "idle",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Reducers used by classic thunks (getAllStudents, updateStudentFields, removeStuff)
    getRequest: (state) => {
      state.loading = true;
    },
    stuffDone: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
      state.statestatus = "added";
    },
    getSuccess: (state, action) => {
      state.studentsList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    underStudentControl: (state) => {
      state.loading = false;
      state.response = null;
      state.error = null;
      state.statestatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // ✅ Only handle createStudent here
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsList.push(action.payload);
        state.response = "Student created successfully";
        state.statestatus = "added";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.response = "Failed to create student";
      });
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  underStudentControl,
  stuffDone,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;