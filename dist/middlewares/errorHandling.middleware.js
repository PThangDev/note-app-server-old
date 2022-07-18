"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../helpers/logger"));
const utils_1 = require("../utils");
const errorHandlingMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    logger_1.default.error(err);
    // If error has status code === 11000. It's mean some value has already exist in database
    if (err.code === 11000) {
        const fieldError = Object.keys(err.keyValue)[0];
        return res
            .status(status)
            .json({ errors: { message: `${(0, utils_1.uppercaseFirstLetter)(fieldError)} has already exists` } });
    }
    if (err.path === '_id') {
        return res.status(status).json({ errors: { message: 'Invalid Id. Please try again' } });
    }
    if (err.message === 'jwt expired') {
        return res
            .status(401)
            .json({ errors: Object.assign(Object.assign({}, err), { message: 'Session expired. Please login again' }), status: 401 });
    }
    return res.status(status).json({ errors: err });
};
exports.default = errorHandlingMiddleware;
