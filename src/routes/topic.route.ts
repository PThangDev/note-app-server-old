import express from 'express';
import topicController from '../controllers/topic.controller';
import authMiddleware from '../middlewares/auth.middleware';

const topicRouter = express.Router();

// GET
// Topics
topicRouter.get('/', authMiddleware, topicController.getTopicsHandler);
// POST
// Create new topic
topicRouter.post('/', authMiddleware, topicController.createTopicHandler);
// PUT
// Update topic by slug
topicRouter.put('/:id', authMiddleware, topicController.updateTopicHandler);
// DELETE
// Delete topic by slug
topicRouter.delete('/:id', authMiddleware, topicController.deleteTopicHandler);

export default topicRouter;
