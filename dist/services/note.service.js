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
const http_errors_1 = __importDefault(require("http-errors"));
const createSlug_1 = __importDefault(require("../helpers/createSlug"));
const QueryAPI_1 = __importDefault(require("../helpers/QueryAPI"));
const note_model_1 = __importDefault(require("../models/note.model"));
const noteService = {
    // GET Notes
    getNotes(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page, sort, search } = req.body;
            const response = new QueryAPI_1.default(note_model_1.default
                .find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                .populate({ path: 'user', select: '-password' })
                .populate({ path: 'topic' }), { limit, page, sort, search });
            const topics = yield response.query;
            return topics;
        });
    },
    // Create Notes
    createNotes(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, thumbnail, topic, background } = req.body;
            const newNote = new note_model_1.default({
                title,
                content,
                thumbnail,
                background,
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                topic,
                slug: (0, createSlug_1.default)(title),
            });
            yield newNote.save();
            return newNote._doc;
        });
    },
    // Update note
    updateNote(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, thumbnail, background, topic } = req.body;
            const { id } = req.params;
            const data = { title, content, thumbnail, background, topic, slug: '' };
            Object.keys(data).forEach((key) => {
                var _a;
                return data[key] === undefined || ((_a = data[key]) === null || _a === void 0 ? void 0 : _a.trim()) === ''
                    ? delete data[key]
                    : {};
            });
            if (data.hasOwnProperty('title')) {
                data.slug = (0, createSlug_1.default)(data.title);
            }
            const noteUpdated = yield note_model_1.default.findByIdAndUpdate(id, data, { new: true });
            return noteUpdated;
        });
    },
    // Delete 1 note
    deleteNote(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const noteDeleted = yield note_model_1.default.findOneAndDelete({ _id: id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
            if (!noteDeleted)
                throw (0, http_errors_1.default)(404, 'Note does not exist');
            return noteDeleted;
        });
    },
    // Delete many notes
    deleteManyNotes(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { notes } = req.body;
            const notesDeleted = yield note_model_1.default.deleteMany({ _id: notes, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
            if (!notesDeleted || notesDeleted.deletedCount === 0)
                throw (0, http_errors_1.default)(400, 'Delete failed. Invalid note');
            return notesDeleted;
        });
    },
};
exports.default = noteService;
