import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { IRequestAuth } from '../types';
import { generateActiveToken } from '../utils/generateToken';

const userController = {
  // POST: Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.loginUser(req.body);

      return res.status(201).json({ user, message: 'Login successfully' });
    } catch (error) {
      next(error);
    }
  },
  // POST: Register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.createUser(req.body);

      return res.status(200).json({ data, message: 'Register successfully. Please check your email' });
    } catch (error) {
      next(error);
    }
  },
  // POST: active account
  async activeAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { active_token } = req.body;
      await userService.activeAccount(active_token);
      return res.status(200).json({ message: 'Account has been activated' });
    } catch (error) {
      next(error);
    }
  },
  // GET: logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshtoken', { path: `/api/v1/auth/refresh_token` });
      return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
      next(error);
    }
  },
  // PUT: change password
  async changePassword(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      await userService.changePassword({ ...req.body, user });
      return res.status(200).json({ message: 'Change password successfully' });
    } catch (error) {
      next(error);
    }
  },
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const access_token = await userService.resetPassword(email);
      return res.status(200).json({ access_token, message: 'Success. Please check your email' });
    } catch (error) {
      next(error);
    }
  },
};
export default userController;
