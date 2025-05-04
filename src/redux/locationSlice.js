import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  longitude1: null,
  latitude1: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude1 = action.payload.latitude1;
      state.longitude1 = action.payload.longitude1;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
