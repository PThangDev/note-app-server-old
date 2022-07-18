"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const noteRouter = express_1.default.Router();
// GET
// api/v1/notes
noteRouter.get('/', auth_middleware_1.default, note_controller_1.default.getNotesHandler);
// GET
// api/v1/notes/:slug
noteRouter.get('/:slug', auth_middleware_1.default, note_controller_1.default.getNoteBySlugHandler);
// POST
// api/v1/notes
noteRouter.post('/', auth_middleware_1.default, note_controller_1.default.createNoteHandler);
// PUT
// api/v1/notes/:slug
noteRouter.put('/:slug', auth_middleware_1.default, note_controller_1.default.updateNoteHandler);
// DELETE
// api/v1/notes/:slug
noteRouter.delete('/:slug', auth_middleware_1.default, note_controller_1.default.deleteNoteHandler);
// DELETE
// api/v1/notes
noteRouter.delete('/', auth_middleware_1.default, note_controller_1.default.deleteManyNoteHandler);
exports.default = noteRouter;
