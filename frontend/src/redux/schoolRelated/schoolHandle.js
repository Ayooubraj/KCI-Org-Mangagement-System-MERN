import axios from "axios";

export const getAllSchools = () => async (dispatch) => {
  try {
    const res = await axios.get("/Schools");
    dispatch({ type: "SET_SCHOOLS", payload: res.data });
  } catch (err) {
    console.error("Error fetching schools", err);
  }
};
