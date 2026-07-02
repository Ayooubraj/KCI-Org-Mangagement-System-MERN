const initialState = { grades: [] };

export const gradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GRADES":
      return { ...state, grades: action.payload };
    default:
      return state;
  }
};
