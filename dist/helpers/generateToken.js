"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.generateActiveToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateActiveToken = (payload, expiresIn = '5m') => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, { expiresIn });
};
exports.generateActiveToken = generateActiveToken;
const generateAccessToken = (payload, expiresIn = '1h') => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload, expiresIn = '30d') => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn });
};
exports.generateRefreshToken = generateRefreshToken;
