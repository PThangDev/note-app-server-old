import { omit } from 'lodash';
import userModel from '../models/user.model';
import { IChangePassword, IDecodedToken, INewUser, IUser, IUserLogin } from '../types';
import { validateEmail } from '../utils';
import createErrors from 'http-errors';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from '../utils/generateToken';
import sendEmail from '../helpers/sendEmail';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

const userService = {
  // Create user
  async createUser(data: INewUser) {
    const CLIENT_URL = process.env.CLIENT_URL;

    try {
      const { username, email, password } = data;
      const passwordHash = await bcrypt.hash(password, 12);

      const active_token = generateActiveToken({ newUser: { username, email, password: passwordHash } });

      const url = `${CLIENT_URL}/active/${active_token}`;
      sendEmail(email, url, 'Verify your email address');

      return { url, active_token };
    } catch (error) {
      throw error;
    }
  },
  // Login
  async loginUser(data: IUserLogin) {
    try {
      const { account, password } = data;
      let user;
      if (validateEmail(account)) {
        user = await userModel.findOne({ email: account });
      } else {
        user = await userModel.findOne({ username: account });
      }
      // If cannot find user
      if (!user) {
        throw createErrors(400, 'Username or Email does not exists');
      }
      // Compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        throw createErrors(400, 'Password is incorrect');
      }
      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id });
      return { ...user._doc, access_token, refresh_token, password: '' };
    } catch (error) {
      throw error;
    }
  },
  // Active account
  async activeAccount(req: Request) {
    try {
      const { active_token } = req.body;

      const decodedToken = jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`) as IDecodedToken;

      const { newUser } = decodedToken;
      if (!newUser) {
        throw createErrors(401, 'Invalid authentication');
      }

      const _newUser = new userModel(newUser);

      await _newUser.save();
    } catch (error) {
      throw error;
    }
  },
  // Change password
  async changePassword({ oldPassword, newPassword }: IChangePassword) {
    try {
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
