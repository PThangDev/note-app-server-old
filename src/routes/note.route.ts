import express from 'express';
import noteController from '../controllers/note.controller';
import authMiddleware from '../middlewares/auth.middleware';

const noteRouter = express.Router();

// GET
// api/v1/notes
noteRouter.get('/', authMiddleware, noteController.getNotesHandler);

// GET
// api/v1/notes/topics
noteRouter.get('/topics', authMiddleware, noteController.getNotesOfTopicsHandler);

// GET
// api/v1/notes/topic/:slug
noteRouter.get('/topic/:slug', authMiddleware, noteController.getNotesOfTopicHandler);

// GET
// api/v1/notes/:id
noteRouter.get('/:id', authMiddleware, noteController.getNoteHandler);

// POST
// api/v1/notes
noteRouter.post('/', authMiddleware, noteController.createNoteHandler);
// PUT
// api/v1/notes
noteRouter.put('/', authMiddleware, noteController.updateNotesHandler);
// PUT
// api/v1/notes/:id
noteRouter.put('/:id', authMiddleware, noteController.updateNoteHandler);

// DELETE
// api/v1/notes/:id
noteRouter.delete('/:id', authMiddleware, noteController.deleteNoteHandler);
// DELETE
// api/v1/notes
noteRouter.delete('/', authMiddleware, noteController.deleteManyNoteHandler);

export default noteRouter;
