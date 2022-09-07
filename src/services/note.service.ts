import createErrors from 'http-errors';
import createSlug from '../helpers/createSlug';
import QueryAPI from '../helpers/QueryAPI';
import noteModel from '../models/note.model';
import topicModel from '../models/topic.model';
import { INoteUpdate, IQueryString, IRequestAuth, IUpdateManyNotes } from '../types';
import topicService from './topic.service';

const noteService = {
  // GET Notes
  async getNotes(req: IRequestAuth) {
    const { limit, q: search, topics } = req.query;

    const filter: { [key: string]: any } = {
      ...req.query,
      user: req.user?._id,
    };

    if (search) {
      filter['$text'] = { $search: search };
    }
    if (topics === 'null') {
      filter.topics = { $size: 0 };
    }

    const response = new QueryAPI(
      noteModel
        .find(filter)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'topics' }),
      filter
    )
      .pagination()
      .sortable()
      .filter();
    const counter = new QueryAPI(
      noteModel
        .find(filter)
        .populate({ path: 'user', select: '-password' })
        .populate({ path: 'topics' }),
      filter
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
  // GET note
  async getNote(req: IRequestAuth) {
    const { id } = req.params;
    const note = await noteModel.findById(id);
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
  async getNotesOfTopics(req: IRequestAuth) {
    // return { notes, topics };
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
      slug: createSlug(title),
      topics,
    });

    await newNote.save();
    // Update notes in topic
    if (topics.length) {
      await topicModel.updateMany(
        { _id: { $in: topics }, user: req.user?._id },
        { $push: { notes: newNote._id } }
      );
    }
    return newNote._doc;
  },
  // Update note
  async updateNote(req: IRequestAuth) {
    const { title, content, thumbnail, background, topics, is_pin, is_trash } = req.body;
    const { id } = req.params;

    const data: INoteUpdate = {
      title,
      content,
      thumbnail,
      background,
      topics,
      slug: '',
      is_pin,
      is_trash,
    };

    Object.keys(data).forEach((key) =>
      data[<keyof INoteUpdate>key] === undefined || data[<keyof INoteUpdate>key] === ''
        ? delete data[<keyof INoteUpdate>key]
        : {}
    );
    if (data.hasOwnProperty('title')) {
      data.slug = createSlug(data.title);
    }
    const noteUpdated = await noteModel
      .findOneAndUpdate({ _id: id, user: req.user?._id }, data, {
        new: true,
      })
      .populate({ path: 'topics' });

    const topicIds = noteUpdated?.topics?.map((topic) => topic._id);

    if (topics?.length) {
      console.log(noteUpdated);
      console.log(topics);
      const topicsUpdateNote = topicModel.updateMany(
        { _id: { $in: topicIds }, user: req.user?._id },
        {
          $addToSet: { notes: noteUpdated?._id },
        }
      );
      const topicsRemoveNote = topicModel.updateMany(
        { _id: { $nin: topicIds }, user: req.user?._id },
        { $pull: { notes: noteUpdated?._id } }
      );
      await Promise.all([topicsUpdateNote, topicsRemoveNote]);
    } else {
      // await topicModel.updateMany({ user: req.user?._id }, { $pull: { notes: noteUpdated?._id } });
    }
    return noteUpdated;
  },
  // Update many note
  async updateNotes(req: IRequestAuth) {
    const { noteIds, update } = req.body;

    const dataUpdate = {
      is_trash: update.is_trash,
      is_pin: update.is_pin,
    };

    Object.keys(dataUpdate).forEach((key) => {
      if (dataUpdate[key as keyof IUpdateManyNotes] === undefined) {
        delete dataUpdate[key as keyof IUpdateManyNotes];
      }
    });
    const notesUpdated = await noteModel.updateMany(
      { _id: { $in: noteIds } },
      { $set: dataUpdate },
      {
        new: true,
      }
    );

    return notesUpdated;
  },
  // Delete 1 note
  async deleteNote(req: IRequestAuth) {
    const { id } = req.params;

    const noteDeleted = await noteModel.findOneAndDelete({ _id: id, user: req.user?._id });

    if (!noteDeleted) throw createErrors(404, 'Note does not exist');

    // Delete note in topics
    const topicsDeletedNote = await topicModel.updateMany(
      { notes: id, user: req.user?._id },
      { $pull: { notes: id } }
    );
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
