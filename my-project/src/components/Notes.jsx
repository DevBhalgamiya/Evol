import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote, updateNote, deleteNote } from "../features/notesSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.notes);

  const [newNote, setNewNote] = useState({ title: "", content: "" });

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = (note) => {
    dispatch(addNote(note));
    setNewNote({ title: "", content: "" }); // Clear the form after submission
  };

  const handleUpdateNote = (id, updatedData) => {
    dispatch(updateNote({ id, updatedData }));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  // Safeguard to ensure `notes` is an array before calling `map`
  const notesList = Array.isArray(notes) ? notes : [];

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Notes</h1>

      {status === "loading" && <p className="text-center text-blue-600">Loading...</p>}

      {status === "failed" && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Add Note Form */}
      <div className="mb-6 p-4 bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Note</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newNote.title && newNote.content) {
              handleAddNote(newNote);
            }
          }}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter note content"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Notes List */}
      <ul className="space-y-4">
        {notesList.length === 0 ? (
          <p className="text-center text-gray-500">No notes available.</p>
        ) : (
          notesList.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

    </div>
  );
};

export default Notes;
