// studentHandle.js
// This file contains all async actions (thunks) related to student management.
// It uses axios to communicate with the backend API and dispatches slice actions
// to update Redux state accordingly.

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import synchronous slice actions (used by non-thunk functions)
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "./studentSlice";

/**
 * 🔹 getAllStudents
 * Fetches all students for a given admin.
 * Dispatches slice actions manually (classic thunk style).
 */
export const getAllStudents = (adminID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/AdminStudents`
    );

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      // Backend returns { count, students }
      dispatch(getSuccess(result.data.students));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

/**
 * 🔹 updateStudentFields
 * Updates specific fields of a student (PUT request).
 */
export const updateStudentFields = (id, fields, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
      fields,
      { headers: { "Content-Type": "application/json" } }
    );

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

/**
 * 🔹 removeStuff
 * Removes or deactivates a student (PUT request).
 */
export const removeStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

/**
 * 🔹 createStudent (AsyncThunk)
 * Registers a new student using FormData (for file uploads).
 * This is handled in studentSlice.js via extraReducers.
 */
export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in studentData) {
        formData.append(key, studentData[key]);
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/studentRegister`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data.student; // returned to slice's fulfilled case
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);