import React from 'react'

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (!Array.isArray(notes)) {
    return <p>No notes available.</p>; // You can return a fallback UI if it's not an array
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
