"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
        unique: false,
    },
    thumbnail: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('topics', topicSchema);
