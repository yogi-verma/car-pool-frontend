import { configureStore } from "@reduxjs/toolkit";
import availableSeatsReducer from "./availableSeatsSlice"; // Import the slice

// Create the Redux store
const store = configureStore({
  reducer: {
    availableSeats: availableSeatsReducer, // Add the slice to the store
  },
});

export default store;