import { NextFunction, Response } from 'express';
import noteService from '../services/note.service';
import { IRequestAuth } from '../types';

const noteController = {
  //GET
  async getNotesHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { notes, pagination } = await noteService.getNotes(req);
      return res.status(200).json({ data: notes, pagination, message: 'Get topics successfully' });
    } catch (error) {
      next(error);
    }
  },
  // POST create note
  async createNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const newNote = await noteService.createNotes(req);
      return res.status(201).json({ data: newNote, message: 'Create note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // PUT Update note
  async updateNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const noteUpdated = await noteService.updateNote(req);
      return res.status(200).json({ data: noteUpdated, message: 'Update note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // DELETE delete 1 note
  async deleteNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const noteDeleted = await noteService.deleteNote(req);
      return res.status(200).json({ data: noteDeleted, message: 'Delete note successfully' });
    } catch (error) {
      next(error);
    }
  },
  // DELETE delete many note
  async deleteManyNoteHandler(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const notesDeleted = await noteService.deleteManyNotes(req);
      return res.status(200).json({ data: notesDeleted, message: 'Delete notes successfully' });
    } catch (error) {
      next(error);
    }
  },
};
export default noteController;
