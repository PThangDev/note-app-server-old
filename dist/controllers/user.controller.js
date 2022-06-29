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
const user_service_1 = __importDefault(require("../services/user.service"));
const userController = {
    // POST: Login
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.loginUser(req.body);
                return res.status(201).json({ user, message: 'Login successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // POST: Register
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.createUser(req.body);
                return res.status(200).json({ data, message: 'Register successfully. Please check your email' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // POST: active account
    activeAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { active_token } = req.body;
                yield user_service_1.default.activeAccount(active_token);
                return res.status(200).json({ message: 'Account has been activated' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // GET: logout
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('refreshtoken', { path: `/api/v1/auth/refresh_token` });
                return res.status(200).json({ message: 'Logged out' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    // PUT: change password
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield user_service_1.default.changePassword(Object.assign(Object.assign({}, req.body), { user }));
                return res.status(200).json({ message: 'Change password successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const access_token = yield user_service_1.default.resetPassword(email);
                return res.status(200).json({ access_token, message: 'Success. Please check your email' });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = userController;
