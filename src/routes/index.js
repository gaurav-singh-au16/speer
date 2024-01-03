const express = require('express');
const { login, signup } = require('../controllers/auth.controler');
const authenticateToken = require('../middlewares/access.middleware');
const { getNotes, getNoteById, createNote, updateNote, deleteNote, shareNote, searchNote } = require('../controllers/note.controller');

const Router = express.Router
const route = Router();

// auth APIS
route.post('/auth/signup', signup)
route.post('/auth/login', login)


// note APIS
route.get('/notes', authenticateToken, getNotes)
route.get('/notes/:id', authenticateToken, getNoteById)
route.post('/notes', authenticateToken, createNote)
route.put('/notes/:id', authenticateToken, updateNote)
route.delete('/notes/:id', authenticateToken, deleteNote)
route.post('/notes/:id/share', authenticateToken, shareNote)
route.get('/search?', authenticateToken, searchNote)

module.exports = route