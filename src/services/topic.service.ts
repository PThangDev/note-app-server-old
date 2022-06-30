import slugify from 'slugify';
import FeaturesAPI from '../helpers/FeaturesAPI';
import topicModel from '../models/topic.model';
import { IRequestAuth } from '../types';
import createErrors from 'http-errors';

const topicService = {
  async getTopics(req: IRequestAuth) {
    const { limit, page, sort, search } = req.body;
    try {
      const features = new FeaturesAPI(
        topicModel.find({ user: req?.user }).populate({ path: 'user', select: '-password' }),
        {
          limit,
          page,
          sort,
          search,
        }
      );
      const topics = await features.query;
      return topics;
    } catch (error) {
      throw error;
    }
  },
  async createTopic(req: IRequestAuth) {
    const { user } = req;
    const { name, thumbnail } = req.body;
    const newTopic = new topicModel({
      name,
      thumbnail,
      user: user?._id,
      slug: slugify(name, { lower: true, locale: 'vi' }),
    });

    await newTopic.save();
    return newTopic._doc;
  },
  async updateTopic(req: IRequestAuth) {
    try {
      const { user } = req;
      const data = { ...req.body };
      const { slug } = req.params;

      Object.keys(data).forEach((key) =>
        data[key] === undefined || data[key].trim() === '' ? delete data[key] : {}
      );
      if (data.hasOwnProperty('name')) {
        data.slug = slugify(data.name, { lower: true, locale: 'vi' });
      }

      const topicUpdated = await topicModel.findOneAndUpdate({ slug, user: user?._id }, data, {
        new: true,
      });

      if (!topicUpdated) throw createErrors(404, 'Topic does not exists');

      return topicUpdated;
    } catch (error) {
      throw error;
    }
  },
  async deleteTopic(req: IRequestAuth) {
    try {
      const { user } = req;
      const data = { ...req.body };
      const { slug } = req.params;

      const topicDeleted = await topicModel.findOneAndDelete({ slug, user: user?._id }, data);

      if (!topicDeleted) throw createErrors(404, 'Topic does not exists');

      return topicDeleted;
    } catch (error) {
      throw error;
    }
  },
};
export default topicService;
