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
            const { limit, page, sort, search } = req.query;
            const filter = {
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            };
            if (search) {
                filter['$text'] = { $search: search };
            }
            const response = new QueryAPI_1.default(note_model_1.default
                .find(filter)
                .populate({ path: 'user', select: '-password' })
                .populate({ path: 'topics' }), { limit, page, sort, search })
                .pagination()
                .sortable();
            const [notes, totalItems] = yield Promise.all([
                response.query,
                note_model_1.default.countDocuments(filter),
            ]);
            const pageCount = Math.ceil(totalItems / Number(limit)) || 1;
            const pagination = {
                limit: Number(limit),
                total: totalItems,
                pageSize: notes.length,
                pageCount,
            };
            return { notes, pagination };
        });
    },
    // GET note by slug
    getNoteBySlug(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const note = yield note_model_1.default.findOne({ slug });
            return note;
        });
    },
    // Create Notes
    createNotes(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, thumbnail, topics, background } = req.body;
            const newNote = new note_model_1.default({
                title,
                content,
                thumbnail,
                background,
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                topics,
                slug: (0, createSlug_1.default)(title),
            });
            yield newNote.save();
            return newNote._doc;
        });
    },
    // Update note
    updateNote(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, thumbnail, background, topics, type } = req.body;
            const { slug } = req.params;
            const data = { title, content, thumbnail, background, topics, slug: '', type };
            Object.keys(data).forEach((key) => data[key] === undefined || data[key] === ''
                ? delete data[key]
                : {});
            if (data.hasOwnProperty('title')) {
                data.slug = (0, createSlug_1.default)(data.title);
            }
            const noteUpdated = yield note_model_1.default
                .findOneAndUpdate({ slug, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, data, {
                new: true,
            })
                .populate({ path: 'topics' });
            return noteUpdated;
        });
    },
    // Delete 1 note
    deleteNote(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const noteDeleted = yield note_model_1.default.findOneAndDelete({ slug, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
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
