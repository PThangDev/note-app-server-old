"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const errorHandlingMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    // If error has status code === 11000. It's mean some value has already exist in database
    if (err.code === 11000) {
        const fieldError = Object.keys(err.keyValue)[0];
        return res.status(status).json({ message: `${(0, utils_1.uppercaseFirstLetter)(fieldError)} has already exists` });
    }
    if (err.path === '_id') {
        return res.status(status).json({ message: 'Invalid Id. Please try again' });
    }
    return res.status(status).json({ errors: err });
};
exports.default = errorHandlingMiddleware;
