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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        if (!token)
            throw (0, http_errors_1.default)(401, 'Unauthorization!');
        const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decodedToken)
            throw (0, http_errors_1.default)(401, 'Unauthorization!');
        const user = yield user_model_1.default.findOne({ _id: decodedToken.id }).select('-password');
        if (!user)
            throw (0, http_errors_1.default)(401, 'User does not exists');
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authMiddleware;
