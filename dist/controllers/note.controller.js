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
const note_service_1 = __importDefault(require("../services/note.service"));
const noteController = {
    //GET notes
    getNotesHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { notes, pagination } = yield note_service_1.default.getNotes(req);
                return res.status(200).json({ data: notes, pagination, message: 'Get topics successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // GET note by slug
    getNoteBySlugHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_service_1.default.getNoteBySlug(req);
                if (!note)
                    throw (0, http_errors_1.default)(404, 'Note does not exist');
                return res.status(200).json({ data: note, message: 'Get note successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // POST create note
    createNoteHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield note_service_1.default.createNotes(req);
                return res.status(201).json({ data: newNote, message: 'Create note successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // PUT Update note
    updateNoteHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const noteUpdated = yield note_service_1.default.updateNote(req);
                if (!noteUpdated)
                    throw (0, http_errors_1.default)(400, 'Update failed. Note does not exist');
                return res.status(200).json({ data: noteUpdated, message: 'Update note successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // DELETE delete 1 note
    deleteNoteHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const noteDeleted = yield note_service_1.default.deleteNote(req);
                return res.status(200).json({ data: noteDeleted, message: 'Delete note successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // DELETE delete many note
    deleteManyNoteHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notesDeleted = yield note_service_1.default.deleteManyNotes(req);
                return res.status(200).json({ data: notesDeleted, message: 'Delete notes successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = noteController;
