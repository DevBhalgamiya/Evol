import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileType, setFileType] = useState("image");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("tags", tags);
        formData.append("email", email);
        
        // Handle different file types
        if (fileType === "image") {
          formData.append("imageFile", file);
        } else if (fileType === "video") {
          formData.append("videoFile", file);
        } else {
          // Handle local file upload
          formData.append("file", file);
        }
    
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/upload/" +
              (fileType === "image" ? "imageUpload" : fileType === "video" ? "videoUpload" : "localFileUpload"),
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
    
          setMessage(response.data.message);
        } catch (error) {
          setMessage("Error uploading file.");
        } finally {
          setLoading(false);
        }
    };

  return (
    <div className="container max-w-[1080px] mx-auto p-4 text-black">
      <h1 className="text-3xl font-semibold text-center mb-4">File Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fileName" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="fileName"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium">Tags</label>
          <input
            type="text"
            id="tags"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium">Choose File</label>
          <input
            type="file"
            id="file"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label htmlFor="fileType" className="block text-sm font-medium">File Type</label>
          <select
            id="fileType"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="local">Local File</option>
          </select>
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B3D530] hover:bg-black text-white font-semibold rounded-md"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button 
            onClick={() => window.location.href = '/notes'}
            className='w-full py-2 px-4 bg-[#B3D530] hover:bg-black text-white font-semibold rounded-md'>
                Notes
           </button>   
        </div>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded ${message.includes("Error") ? "bg-red-200" : "bg-green-200"}`}>
          <p className="text-center">{message}</p>
        </div>
      )}
    </div>
  )
}

export default Upload