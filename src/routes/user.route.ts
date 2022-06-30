import express from 'express';

import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateLogin, validateResgier } from '../middlewares/validateRequest.middleware';
import { validateChangePassword, validateForgotPassword } from './../middlewares/validateRequest.middleware';

const router = express.Router();
// Login
// POST: /api/v1/auth/login
router.post('/login', validateLogin, userController.loginHandler);
// Register
// POST: /api/v1/auth/register
router.post('/register', validateResgier, userController.registerHandler);
// Logout
// POST: /api/v1/auth/sessions
router.post('/sessions', () => {});
// Active account
// POST: /api/v1/auth/active
router.post('/active', userController.activeAccountHandler);

// Logout
// GET: /api/v1/auth/logout
router.post('/logout', userController.logoutHandler);
// Change password
// PUT: /api/v1/auth/change-password
router.put('/change-password', authMiddleware, validateChangePassword, userController.changePasswordHandler);
// Forgot Password
// GET: /api/v1/auth/forgot-password
router.post('/forgot-password', validateForgotPassword, userController.forgotPasswordHandler);

export default router;
