import axios from "../../utils/axiosConfig";


export const getAllGrades = () => async (dispatch) => {
  try {
    const res = await axios.get("/Grades");
    dispatch({ type: "SET_GRADES", payload: res.data });
  } catch (err) {
    console.error("Error fetching grades", err);
  }
};
