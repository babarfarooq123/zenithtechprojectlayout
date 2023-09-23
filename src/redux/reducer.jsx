import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const zenithSlice = createSlice({
  name: "zenith",
  initialState,
  reducers: {
    language: (state = {}, action) => {
        return {
            ...state,
            language: action.payload.language
        }
    }
  }
});

export const { language } = zenithSlice.actions;

export default zenithSlice.reducer;