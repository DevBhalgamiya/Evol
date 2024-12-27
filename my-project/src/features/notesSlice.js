import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for API calls
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/notes");
    return response.data; // Make sure this is an array of notes
  });  
  

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const response = await axios.post("http://localhost:3000/api/v1/notes", note);
  return response.data;
});

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updatedData }) => {
    const response = await axios.put(`http://localhost:3000/api/v1/notes/${id}`, updatedData);
    return response.data;
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  await axios.delete(`http://localhost:3000/api/v1/notes/${id}`);
  return id;
});

// Notes Slice
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [], // List of notes
    status: "idle", // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Note
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update Note
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete Note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError } = noteSlice.actions;

export default noteSlice.reducer;
