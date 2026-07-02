import axios from "../../utils/axiosConfig";


export const getAllRegions = () => async (dispatch) => {
  try {
    const res = await axios.get("/Regions");
    dispatch({ type: "SET_REGIONS", payload: res.data });
  } catch (err) {
    console.error("Error fetching regions", err);
  }
};
