export const initialTotalPrice = 0;

export const reducerTotalPrice = (state, action) => {
    switch (action.type) {
      case "SET_TOTAL_PRICE":
        return (action.payload);
      default:
        return state;
    }
  }
  