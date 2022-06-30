"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const createSlug = (name = '') => {
    return (0, slugify_1.default)(name, { lower: true, locale: 'vi' });
};
exports.default = createSlug;
