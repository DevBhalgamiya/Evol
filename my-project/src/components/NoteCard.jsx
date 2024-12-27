import React from 'react'

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{note.title}</h2>
      <p className="text-sm text-gray-600">{note.content.substring(0, 100)}...</p>
      {note.image && <img src={note.image} alt="Note" className="mt-2 w-full" />}
      <div className="flex justify-between mt-4">
        <button onClick={() => onEdit(note.id)} className="btn-primary">
          Edit
        </button>
        <button onClick={() => onDelete(note.id)} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard