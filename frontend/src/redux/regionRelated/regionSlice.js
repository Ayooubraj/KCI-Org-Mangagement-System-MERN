const initialState = { regions: [] };

export const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REGIONS":
      return { ...state, regions: action.payload };
    default:
      return state;
  }
};
