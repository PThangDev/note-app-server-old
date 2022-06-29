import { NextFunction, Response } from 'express';
import createErrors from 'http-errors';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { IDecodedToken, IRequestAuth } from '../types';
const authMiddleware = async (req: IRequestAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) throw createErrors(401, 'Unauthorization!');

    const decodedToken = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

    if (!decodedToken) throw createErrors(401, 'Unauthorization!');

    const user = await userModel.findOne({ _id: decodedToken.id }).select('-password');

    if (!user) throw createErrors(401, 'User does not exists');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
