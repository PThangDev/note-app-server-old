import express from 'express';
import topicController from '../controllers/topic.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// GET
// Topics
router.get('/', authMiddleware, topicController.getTopicsHandler);
// POST
// Create new topic
router.post('/', authMiddleware, topicController.createTopicHandler);
// PUT
// Update topic by slug
router.put('/:slug', authMiddleware, topicController.updateTopicHandler);
// DELETE
// Delete topic by slug
router.delete('/:slug', authMiddleware, topicController.deleteTopicHandler);

export default router;
