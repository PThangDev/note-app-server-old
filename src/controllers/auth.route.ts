import { NextFunction, Request, Response } from 'express';

const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  },
};
export default authController;
