import createErrors from 'http-errors';
import createSlug from '../helpers/createSlug';
import QueryAPI from '../helpers/QueryAPI';
import noteModel from '../models/note.model';
import topicModel from '../models/topic.model';
import { INoteUpdate, IQueryString, IRequestAuth } from '../types';

const noteService = {
  // GET Notes
  async getNotes(req: IRequestAuth) {
    const { limit, page, sort, search } = <IQueryString>req.query;

    const filter: { [key: string]: any } = {
      user: req.user?._id,
    };

    if (search) {
      filter['$text'] = { $search: search };
    }

    const response = new QueryAPI(
      noteModel
        .find(filter)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'topics' }),
      { limit, page, sort, search }
    )
      .pagination()
      .sortable();
    const counter = new QueryAPI(
      noteModel
        .find(filter)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'topics' }),
      { limit, page, sort, search }
    )
      .search()
      .filter()
      .count();
    const [notes, totalItems] = await Promise.all([response.query, counter.query]);
    const pageCount = Math.ceil(totalItems / Number(limit)) || 1;

    const pagination = {
      limit: Number(limit),
      total: totalItems,
      pageSize: notes.length,
      pageCount,
    };
    return { notes, pagination };
  },
  // GET note by slug
  async getNoteBySlug(req: IRequestAuth) {
    const { slug } = req.params;
    const note = await noteModel.findOne({ slug });
    return note;
  },
  async getNotesOfTopic(req: IRequestAuth) {
    const { slug } = req.params;
    const topic = await topicModel.findOne({ slug });

    if (!topic) throw createErrors(404, 'Topic does not exist');

    const notes = await noteModel.find({ topics: topic._id });
    return notes;
    // const notes = await noteModel.find({})
  },
  // Create Notes
  async createNote(req: IRequestAuth) {
    const { title, content, thumbnail, topics, background } = req.body;

    const newNote = new noteModel({
      title,
      content,
      thumbnail,
      background,
      user: req.user?._id,
      topics,
      slug: createSlug(title),
    });
    await newNote.save();
    return newNote._doc;
  },
  // Update note
  async updateNote(req: IRequestAuth) {
    const { title, content, thumbnail, background, topics, type } = req.body;
    const { slug } = req.params;

    const data: INoteUpdate = { title, content, thumbnail, background, topics, slug: '', type };

    Object.keys(data).forEach((key) =>
      data[<keyof INoteUpdate>key] === undefined || data[<keyof INoteUpdate>key] === ''
        ? delete data[<keyof INoteUpdate>key]
        : {}
    );
    if (data.hasOwnProperty('title')) {
      data.slug = createSlug(data.title);
    }
    const noteUpdated = await noteModel
      .findOneAndUpdate({ slug, user: req.user?._id }, data, {
        new: true,
      })
      .populate({ path: 'topics' });
    return noteUpdated;
  },
  // Delete 1 note
  async deleteNote(req: IRequestAuth) {
    const { slug } = req.params;
    const noteDeleted = await noteModel.findOneAndDelete({ slug, user: req.user?._id });
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
