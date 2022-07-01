import createErrors from 'http-errors';
import createSlug from '../helpers/createSlug';
import QueryAPI from '../helpers/QueryAPI';
import noteModel from '../models/note.model';
import { INoteUpdate, IRequestAuth } from '../types';

const noteService = {
  // GET Notes
  async getNotes(req: IRequestAuth) {
    const { limit, page, sort, search } = req.body;

    const response = new QueryAPI(
      noteModel
        .find({ user: req.user?._id })
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'topic' }),
      { limit, page, sort, search }
    );
    const topics = await response.query;
    return topics;
  },

  // Create Notes
  async createNotes(req: IRequestAuth) {
    const { title, content, thumbnail, topic, background } = req.body;

    const newNote = new noteModel({
      title,
      content,
      thumbnail,
      background,
      user: req.user?._id,
      topic,
      slug: createSlug(title),
    });
    await newNote.save();
    return newNote._doc;
  },
  // Update note
  async updateNote(req: IRequestAuth) {
    const { title, content, thumbnail, background, topic } = req.body;
    const { id } = req.params;

    const data: INoteUpdate = { title, content, thumbnail, background, topic, slug: '' };

    Object.keys(data).forEach((key) =>
      data[<keyof INoteUpdate>key] === undefined || data[<keyof INoteUpdate>key]?.trim() === ''
        ? delete data[<keyof INoteUpdate>key]
        : {}
    );
    if (data.hasOwnProperty('title')) {
      data.slug = createSlug(data.title);
    }
    const noteUpdated = await noteModel.findByIdAndUpdate(id, data, { new: true });
    return noteUpdated;
  },
  // Delete 1 note
  async deleteNote(req: IRequestAuth) {
    const { id } = req.params;
    const noteDeleted = await noteModel.findOneAndDelete({ _id: id, user: req.user?._id });
    if (!noteDeleted) throw createErrors(404, 'Note does not exist');
    return noteDeleted;
  },
  // Delete many notes
  async deleteManyNotes(req: IRequestAuth) {
    const { notes } = req.body;
    const notesDeleted = await noteModel.deleteMany({ _id: notes, user: req.user?._id });
    if (!notesDeleted || notesDeleted.deletedCount === 0)
      throw createErrors(400, 'Delete failed. Invalid note');
    return notesDeleted;
  },
};
export default noteService;
