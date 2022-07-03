"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_service_1 = __importDefault(require("../services/topic.service"));
const topicController = {
    // GET get Topics
    getTopicsHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topics = yield topic_service_1.default.getTopics(req);
                return res.status(200).json({ data: topics, message: 'Get topics successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // POST Create topic
    createTopicHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTopic = yield topic_service_1.default.createTopic(req);
                return res.status(201).json({ data: newTopic, message: 'Create new topic successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // PUT Update topic
    updateTopicHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topicUpdated = yield topic_service_1.default.updateTopic(req);
                return res.status(200).json({ data: topicUpdated, message: 'Update topic successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // DELETE Delete topic
    deleteTopicHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topicDeleted = yield topic_service_1.default.deleteTopic(req);
                return res.status(200).json({ data: topicDeleted, message: 'Delete topic successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = topicController;
