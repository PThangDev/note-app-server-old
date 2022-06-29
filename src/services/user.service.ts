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

const CLIENT_URL = process.env.CLIENT_URL;
const userService = {
  // Create user
  async createUser(data: INewUser) {
    try {
      const { username, email, password } = data;
      const passwordHash = await bcrypt.hash(password, 12);

      const active_token = generateActiveToken({ newUser: { username, email, password: passwordHash } });

      const url = `${CLIENT_URL}/active/${active_token}`;
      await sendEmail(email, url, 'Verify your email address');

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
      const access_token = generateAccessToken({ _id: user._id });
      const refresh_token = generateRefreshToken({ _id: user._id });
      return { ...user._doc, access_token, refresh_token, password: '' };
    } catch (error) {
      throw error;
    }
  },
  // Active account
  async activeAccount(active_token: string) {
    try {
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
  async changePassword({ oldPassword, newPassword, user }: IChangePassword) {
    try {
      const newPasswordHash = await bcrypt.hash(newPassword, 12);

      const result = await userModel.findByIdAndUpdate(user._id, { password: newPasswordHash });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  async resetPassword(email: string): Promise<string> {
    try {
      const user = await userModel.findOne({ email });

      if (!user) throw createErrors(400, 'Email does not exists');

      if (user.type !== 'register')
        throw createErrors(400, `Quick login account with ${user.type} can't use this function.`);

      const access_token = generateAccessToken({ _id: user._id });
      const url = `${CLIENT_URL}/reset-password/${access_token}`;

      await sendEmail(email, url, 'Forgot password?');
      return access_token;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
