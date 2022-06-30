"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    topic: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'topics' },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        trim: true,
    },
    thumbnail: { type: String, trim: true },
    background: { type: String, trim: true, default: '' },
    slug: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('notes', noteSchema);
