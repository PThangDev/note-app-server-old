import express from 'express';

import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateLogin, validateResgier } from '../middlewares/validateRequest.middleware';
import { validateChangePassword, validateForgotPassword } from './../middlewares/validateRequest.middleware';

const userRouter = express.Router();
// Login
// POST: /api/v1/auth/login
userRouter.post('/login', validateLogin, userController.loginHandler);
// Register
// POST: /api/v1/auth/register
userRouter.post('/register', validateResgier, userController.registerHandler);
// Logout
// POST: /api/v1/auth/sessions
userRouter.post('/sessions', () => {});
// Active account
// GET: /api/v1/auth/active
userRouter.get('/active/:active_token', userController.activeAccountHandler);

// Logout
// GET: /api/v1/auth/logout
userRouter.get('/logout', userController.logoutHandler);
// Change password
// PUT: /api/v1/auth/change-password
userRouter.put(
  '/change-password',
  authMiddleware,
  validateChangePassword,
  userController.changePasswordHandler
);
// Forgot Password
// GET: /api/v1/auth/forgot-password
userRouter.post('/forgot-password', validateForgotPassword, userController.forgotPasswordHandler);

export default userRouter;
