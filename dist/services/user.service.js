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
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = {
    // Create user
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const CLIENT_URL = process.env.CLIENT_URL;
            try {
                const { username, email, password } = data;
                const passwordHash = yield bcrypt_1.default.hash(password, 12);
                const active_token = (0, generateToken_1.generateActiveToken)({ newUser: { username, email, password: passwordHash } });
                const url = `${CLIENT_URL}/active/${active_token}`;
                (0, sendEmail_1.default)(email, url, 'Verify your email address');
                return { url, active_token };
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Login
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { account, password } = data;
                let user;
                if ((0, utils_1.validateEmail)(account)) {
                    user = yield user_model_1.default.findOne({ email: account });
                }
                else {
                    user = yield user_model_1.default.findOne({ username: account });
                }
                // If cannot find user
                if (!user) {
                    throw (0, http_errors_1.default)(400, 'Username or Email does not exists');
                }
                // Compare password
                const isMatchPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatchPassword) {
                    throw (0, http_errors_1.default)(400, 'Password is incorrect');
                }
                const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
                const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id });
                return Object.assign(Object.assign({}, user._doc), { access_token, refresh_token, password: '' });
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Active account
    activeAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { active_token } = req.body;
                const decodedToken = jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);
                const { newUser } = decodedToken;
                if (!newUser) {
                    throw (0, http_errors_1.default)(401, 'Invalid authentication');
                }
                const _newUser = new user_model_1.default(newUser);
                yield _newUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Change password
    changePassword({ oldPassword, newPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                throw error;
            }
        });
    },
};
exports.default = userService;
