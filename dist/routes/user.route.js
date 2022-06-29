"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest_middleware_1 = require("./../middlewares/validateRequest.middleware");
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validateRequest_middleware_2 = require("../middlewares/validateRequest.middleware");
const router = express_1.default.Router();
// Login
// POST: /api/v1/auth/login
router.post('/login', validateRequest_middleware_2.validateLogin, user_controller_1.default.login);
// Register
// POST: /api/v1/auth/register
router.post('/register', validateRequest_middleware_2.validateResgier, user_controller_1.default.register);
// Logout
// POST: /api/v1/auth/sessions
router.post('/sessions', () => { });
// Active account
// POST: /api/v1/auth/active
router.post('/active', user_controller_1.default.activeAccount);
// Logout
// GET: /api/v1/auth/logout
router.post('/logout', user_controller_1.default.logout);
// Change password
// PUT: /api/v1/auth/change-password
router.put('/change-password', auth_middleware_1.default, validateRequest_middleware_1.validateChangePassword, user_controller_1.default.changePassword);
// Forgot Password
// GET: /api/v1/auth/forgot-password
router.post('/forgot-password', validateRequest_middleware_1.validateForgotPassword, user_controller_1.default.forgotPassword);
exports.default = router;
