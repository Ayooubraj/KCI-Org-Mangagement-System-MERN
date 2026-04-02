import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for your backend
const API_URL = "http://localhost:5000";

// Thunk to fetch all donors (Admin view)
export const getAllDonors = createAsyncThunk(
  "donor/getAllDonors",
  async (adminID, { rejectWithValue }) => {
    try {
      // You can pass adminID if needed, but for now we just hit the endpoint
      const response = await axios.get(`${API_URL}/AdminDonors`);
      return response.data.donors; // backend returns { count, donors }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);