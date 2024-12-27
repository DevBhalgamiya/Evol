import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notesSlice";

const store = configureStore({
  reducer: {
    notes: noteReducer, // 'notes' is the slice of state managed by noteReducer
  },
});

export default store;
