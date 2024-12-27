const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the model based on the schema
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
