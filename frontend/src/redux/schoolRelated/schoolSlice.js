const initialState = { schools: [] };

export const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCHOOLS":
      return { ...state, schools: action.payload };
    default:
      return state;
  }
};
