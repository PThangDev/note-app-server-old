"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topic_controller_1 = __importDefault(require("../controllers/topic.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
// GET
// Topics
router.get('/', auth_middleware_1.default, topic_controller_1.default.getTopicsHandler);
// POST
// Create new topic
router.post('/', auth_middleware_1.default, topic_controller_1.default.createTopicHandler);
// PUT
// Update topic by slug
router.put('/:slug', auth_middleware_1.default, topic_controller_1.default.updateTopicHandler);
// DELETE
// Delete topic by slug
router.delete('/:slug', auth_middleware_1.default, topic_controller_1.default.deleteTopicHandler);
exports.default = router;
