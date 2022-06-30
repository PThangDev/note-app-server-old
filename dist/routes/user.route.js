"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const validateRequest_middleware_2 = require("./../middlewares/validateRequest.middleware");
const userRouter = express_1.default.Router();
// Login
// POST: /api/v1/auth/login
userRouter.post('/login', validateRequest_middleware_1.validateLogin, user_controller_1.default.loginHandler);
// Register
// POST: /api/v1/auth/register
userRouter.post('/register', validateRequest_middleware_1.validateResgier, user_controller_1.default.registerHandler);
// Logout
// POST: /api/v1/auth/sessions
userRouter.post('/sessions', () => { });
// Active account
// POST: /api/v1/auth/active
userRouter.post('/active', user_controller_1.default.activeAccountHandler);
// Logout
// GET: /api/v1/auth/logout
userRouter.post('/logout', user_controller_1.default.logoutHandler);
// Change password
// PUT: /api/v1/auth/change-password
userRouter.put('/change-password', auth_middleware_1.default, validateRequest_middleware_2.validateChangePassword, user_controller_1.default.changePasswordHandler);
// Forgot Password
// GET: /api/v1/auth/forgot-password
userRouter.post('/forgot-password', validateRequest_middleware_2.validateForgotPassword, user_controller_1.default.forgotPasswordHandler);
exports.default = userRouter;
