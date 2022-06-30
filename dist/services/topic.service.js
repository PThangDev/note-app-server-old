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
const slugify_1 = __importDefault(require("slugify"));
const FeaturesAPI_1 = __importDefault(require("../helpers/FeaturesAPI"));
const topic_model_1 = __importDefault(require("../models/topic.model"));
const http_errors_1 = __importDefault(require("http-errors"));
const topicService = {
    getTopics(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page, sort, search } = req.body;
            try {
                const features = new FeaturesAPI_1.default(topic_model_1.default.find({ user: req === null || req === void 0 ? void 0 : req.user }).populate({ path: 'user', select: '-password' }), {
                    limit,
                    page,
                    sort,
                    search,
                });
                const topics = yield features.query;
                return topics;
            }
            catch (error) {
                throw error;
            }
        });
    },
    createTopic(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { name, thumbnail } = req.body;
            const newTopic = new topic_model_1.default({
                name,
                thumbnail,
                user: user === null || user === void 0 ? void 0 : user._id,
                slug: (0, slugify_1.default)(name, { lower: true, locale: 'vi' }),
            });
            yield newTopic.save();
            return newTopic._doc;
        });
    },
    updateTopic(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req;
                const data = Object.assign({}, req.body);
                const { slug } = req.params;
                Object.keys(data).forEach((key) => data[key] === undefined || data[key].trim() === '' ? delete data[key] : {});
                if (data.hasOwnProperty('name')) {
                    data.slug = (0, slugify_1.default)(data.name, { lower: true, locale: 'vi' });
                }
                const topicUpdated = yield topic_model_1.default.findOneAndUpdate({ slug, user: user === null || user === void 0 ? void 0 : user._id }, data, {
                    new: true,
                });
                if (!topicUpdated)
                    throw (0, http_errors_1.default)(404, 'Topic does not exists');
                return topicUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    },
    deleteTopic(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req;
                const data = Object.assign({}, req.body);
                const { slug } = req.params;
                const topicDeleted = yield topic_model_1.default.findOneAndDelete({ slug, user: user === null || user === void 0 ? void 0 : user._id }, data);
                if (!topicDeleted)
                    throw (0, http_errors_1.default)(404, 'Topic does not exists');
                return topicDeleted;
            }
            catch (error) {
                throw error;
            }
        });
    },
};
exports.default = topicService;
