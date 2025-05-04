import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableSeats: 0, // Initial value
};

const availableSeatsSlice = createSlice({
  name: "availableSeats",
  initialState,
  reducers: {
    setAvailableSeats: (state, action) => {
      state.availableSeats = action.payload;
    },
  },
});

export const { setAvailableSeats } = availableSeatsSlice.actions;

export default availableSeatsSlice.reducer;