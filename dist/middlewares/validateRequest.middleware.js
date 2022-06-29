"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPassword = exports.validateChangePassword = exports.validateLogin = exports.validateResgier = void 0;
const utils_1 = require("../utils");
const validateResgier = (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const errors = [];
        if (!username) {
            errors.push({ username: 'Username is required' });
        }
        else if (username.length > 15 || username.length < 6) {
            errors.push({ username: 'Username must have at 6-15 characters' });
        }
        else if (!(0, utils_1.validateUsername)(username)) {
            errors.push({ username: 'Username cannot contain special characters' });
        }
        if (!password) {
            errors.push({ password: 'Password is required' });
        }
        else if (password.length > 30 || password.length < 6) {
            errors.push({ password: 'Password must have at 6-30 characters' });
        }
        if (!email) {
            errors.push({ email: 'Email is required' });
        }
        else if (!(0, utils_1.validateEmail)(email)) {
            errors.push({ email: 'Invalid Email' });
        }
        if (errors.length) {
            throw errors;
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.validateResgier = validateResgier;
const validateLogin = (req, res, next) => {
    try {
        const { account, password } = req.body;
        const errors = [];
        if (!account) {
            errors.push({ account: 'Account is required' });
        }
        else if (!(0, utils_1.validateAccount)(account)) {
            errors.push({ account: 'Invalid. Account must be an Email or Username' });
        }
        if (!password) {
            errors.push({ password: 'Password is required' });
        }
        else if (password.length > 30 || password.length < 6) {
            errors.push({ password: 'Password must have at 6-30 characters' });
        }
        if (errors.length) {
            throw errors;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateLogin = validateLogin;
const validateChangePassword = (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const errors = [];
        if (!newPassword) {
            errors.push({ newPassword: 'New password is required' });
        }
        else if (newPassword.length > 30 || newPassword.length < 6) {
            errors.push({ newPassword: 'New password must have at 6-30 characters' });
        }
        if (errors.length) {
            throw errors;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateChangePassword = validateChangePassword;
const validateForgotPassword = (req, res, next) => {
    try {
        const { email } = req.body;
        const errors = [];
        if (!email) {
            errors.push({ email: 'Email is required' });
        }
        else if (!(0, utils_1.validateEmail)(email)) {
            errors.push({ email: 'Invalid Email' });
        }
        if (errors.length) {
            throw errors;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateForgotPassword = validateForgotPassword;
