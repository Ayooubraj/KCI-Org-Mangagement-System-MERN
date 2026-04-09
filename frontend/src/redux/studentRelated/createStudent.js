import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000";

// Create student
export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in studentData) {
        formData.append(key, studentData[key]);
      }

      const res = await axios.post(`${API_URL}/studentRegister`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.student;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);