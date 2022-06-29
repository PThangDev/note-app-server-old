"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const router = express_1.default.Router();
// Login
// POST: /api/v1/auth/login
router.post('/login', validateRequest_middleware_1.validateLogin, user_controller_1.default.login);
// Register
// POST: /api/v1/auth/register
router.post('/register', validateRequest_middleware_1.validateResgier, user_controller_1.default.register);
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
// GET: /api/v1/auth/change-password
router.post('/change-password', user_controller_1.default.changePassword);
exports.default = router;
