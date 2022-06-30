import { NextFunction, Request, Response } from 'express';
import topicService from '../services/topic.service';

const topicController = {
  // GET get Topics
  async getTopicsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await topicService.getTopics(req);
      return res.status(200).json({ topics });
    } catch (error) {
      next(error);
    }
  },
  // POST Create topic
  async createTopicHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const newTopic = await topicService.createTopic(req);
      return res.status(200).json({ data: newTopic, message: 'Create new topic successfully' });
    } catch (error) {
      next(error);
    }
  },
  // PUT Update topic
  async updateTopicHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const topicUpdated = await topicService.updateTopic(req);
      return res.status(200).json({ data: topicUpdated, message: 'Update topic successfully' });
    } catch (error) {
      next(error);
    }
  },
  // DELETE Delete topic
  async deleteTopicHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const topicDeleted = await topicService.deleteTopic(req);
      return res.status(200).json({ data: topicDeleted, message: 'Delete topic successfully' });
    } catch (error) {
      next(error);
    }
  },
};
export default topicController;