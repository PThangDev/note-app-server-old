import express from 'express';
import noteController from '../controllers/note.controller';
import authMiddleware from '../middlewares/auth.middleware';

const noteRouter = express.Router();

// GET
// api/v1/notes
noteRouter.get('/', authMiddleware, noteController.getNotesHandler);
// GET
// api/v1/notes/:slug
noteRouter.get('/:slug', authMiddleware, noteController.getNoteBySlugHandler);
// POST
// api/v1/notes
noteRouter.post('/', authMiddleware, noteController.createNoteHandler);
// PUT
// api/v1/notes/:slug
noteRouter.put('/:slug', authMiddleware, noteController.updateNoteHandler);
// DELETE
// api/v1/notes/:slug
noteRouter.delete('/:slug', authMiddleware, noteController.deleteNoteHandler);
// DELETE
// api/v1/notes
noteRouter.delete('/', authMiddleware, noteController.deleteManyNoteHandler);

export default noteRouter;
