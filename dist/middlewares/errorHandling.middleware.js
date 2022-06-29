"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const errorHandlingMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    if (err.code === 11000) {
        const fieldError = Object.keys(err.keyValue)[0];
        return res.status(status).json({ message: `${(0, utils_1.uppercaseFirstLetter)(fieldError)} has already exists` });
    }
    return res.status(200).json({ errors: err });
};
exports.default = errorHandlingMiddleware;
