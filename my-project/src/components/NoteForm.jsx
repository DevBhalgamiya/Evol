import React from 'react'

const NoteForm = ({ onSave, note }) => {
    const [title, setTitle] = React.useState(note?.title || "");
    const [content, setContent] = React.useState(note?.content || "");
    const [image, setImage] = React.useState(note?.image || null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          setImage(URL.createObjectURL(file));
        } else {
          alert("Please upload a valid image file.");
        }
    };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
          alert("Title and content are required!");
          return;
        }
        onSave({ id: note?.id || Date.now(), title, content, image });
    };
      
      

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
          required
        />
      </div>
      <div>
        <label className="block">Image Upload</label>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        {image && <img src={image} alt="Preview" className="mt-2 w-full" />}
      </div>
      <button type="submit" className="btn-primary mt-4">
        Save Note
      </button>
    </form>
  )
}

export default NoteForm