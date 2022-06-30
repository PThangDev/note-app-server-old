import express from 'express';
import noteController from '../controllers/note.controller';
import authMiddleware from '../middlewares/auth.middleware';

const noteRouter = express.Router();

// GET
// api/v1/notes
noteRouter.get('/', authMiddleware, noteController.getNotesHandler);
// POST
// api/v1/notes
noteRouter.post('/', authMiddleware, noteController.createNoteHandler);
// DELETE
// api/v1/notes/:id
noteRouter.delete('/:id', authMiddleware, noteController.deleteNoteHandler);
// DELETE
// api/v1/notes
noteRouter.delete('/', authMiddleware, noteController.deleteManyNoteHandler);

export default noteRouter;
