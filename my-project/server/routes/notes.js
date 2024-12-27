const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/notes', notesController.getNotes); // Fetch all notes
router.post('/notes', notesController.addNote); // Add a new note
router.put('/notes/:id', notesController.updateNote); // Update a note by ID
router.delete('/notes/:id', notesController.deleteNote); // Delete a note by ID

module.exports = router;
