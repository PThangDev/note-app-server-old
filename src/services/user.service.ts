import bcrypt from 'bcrypt';
import createErrors from 'http-errors';
import jwt from 'jsonwebtoken';
import sendEmail from '../helpers/sendEmail';
import userModel from '../models/user.model';
import { IChangePassword, IDecodedToken, INewUser, IUserLogin } from '../types';
import { validateEmail } from '../utils';
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from '../helpers/generateToken';
import createSlug from '../helpers/createSlug';

const CLIENT_URL = process.env.CLIENT_URL;
const userService = {
  // Create user
  async createUser(data: INewUser) {
    const { username, email, password } = data;
    const userByUsername = await userModel.findOne({ username });
    if (userByUsername) throw createErrors(400, 'Username has already exist');

    const userByEmail = await userModel.findOne({ email });
    if (userByEmail) throw createErrors(400, 'Email has already exist');

    const passwordHash = await bcrypt.hash(password, 12);

    const active_token = generateActiveToken({
      newUser: { username, email, password: passwordHash, slug: createSlug(username) },
    });

    const url = `${CLIENT_URL}/auth/active/${active_token}`;
    // Send url token to email
    // await sendEmail(email, url, 'Verify your email address');

    return { url, active_token };
  },
  // Login
  async loginUser(data: IUserLogin) {
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

    if (!isMatchPassword) throw createErrors(400, 'Password is incorrect');

    const access_token = generateAccessToken({ _id: user._id });
    const refresh_token = generateRefreshToken({ _id: user._id });
    return { ...user._doc, access_token, refresh_token, password: '' };
  },
  // Active account
  async activeAccount(active_token: string) {
    const decodedToken = jwt.verify(
      active_token,
      `${process.env.ACTIVE_TOKEN_SECRET}`
    ) as IDecodedToken;

    const { newUser } = decodedToken;
    if (!newUser) throw createErrors(401, 'Invalid authentication');

    const _newUser = new userModel(newUser);

    await _newUser.save();
  },
  // Change password
  async changePassword({ oldPassword, newPassword, user }: IChangePassword) {
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    const result = await userModel.findByIdAndUpdate(user._id, { password: newPasswordHash });
    return result;
  },

  // Forgot password
  async resetPassword(email: string): Promise<string> {
    const user = await userModel.findOne({ email });

    if (!user) throw createErrors(400, 'Email does not exists');

    if (user.type !== 'register')
      throw createErrors(400, `Quick login account with ${user.type} can't use this function.`);

    const access_token = generateAccessToken({ _id: user._id });
    const url = `${CLIENT_URL}/reset-password/${access_token}`;

    // await sendEmail(email, url, 'Forgot password?');
    return access_token;
  },
};

export default userService;
