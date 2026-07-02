// schoolHandle.js

import axios from "axios";

const API_URL = "http://localhost:5000";

export const getAllSchools = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/Schools`);
    dispatch({ type: "SET_SCHOOLS", payload: res.data });
  } catch (err) {
    console.error("Error fetching schools", err);
  }
};