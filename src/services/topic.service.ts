import createSlug from '../helpers/createSlug';
import QueryAPI from '../helpers/QueryAPI';
import noteModel from '../models/note.model';
import topicModel from '../models/topic.model';
import { IRequestAuth } from '../types';

const topicService = {
  async getTopics(req: IRequestAuth) {
    const { note_limit, note_page } = req.query;
    const features = new QueryAPI(
      topicModel
        .find({ user: req?.user })
        .populate({ path: 'user', select: '-password' })
        .populate({
          path: 'notes',
          match: { is_trash: false, is_pin: false },
          options: { limit: Number(note_limit) || 8 },
          populate: { path: 'topics' },
        }),
      req.query
    )
      .pagination()
      .sortable();
    const topics = await features.query;
    return topics;
  },
  async getTopicDetail(req: IRequestAuth) {
    const { id } = req.params;

    const topicDetail = await topicModel.findOne({ _id: id, user: req.user?._id });
    return topicDetail;
  },
  async createTopic(req: IRequestAuth) {
    const { user } = req;
    const { name, background } = req.body;
    const newTopic = new topicModel({
      name,
      background,
      user: user?._id,
      slug: createSlug(name),
    });

    await newTopic.save();
    return newTopic._doc;
  },
  async updateTopic(req: IRequestAuth) {
    const { user } = req;
    const data = { ...req.body };
    const { id } = req.params;

    Object.keys(data).forEach((key) =>
      data[key] === undefined || data[key].trim() === '' ? delete data[key] : {}
    );
    if (data.hasOwnProperty('name')) {
      data.slug = createSlug(data.name);
    }

    const topicUpdated = await topicModel.findOneAndUpdate({ _id: id, user: user?._id }, data, {
      new: true,
    });
    return topicUpdated;
  },
  async deleteTopic(req: IRequestAuth) {
    const { user } = req;
    const { id } = req.params;

    const topicDeleted = await topicModel.findOneAndDelete({ _id: id, user: user?._id });
    await noteModel.updateMany({ topics: id, user: user?._id }, { topics: [] });

    return topicDeleted;
  },
};
export default topicService;
