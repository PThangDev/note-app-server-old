import { Request } from 'express';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: 'admin' | 'customer';
  _doc: object;
}
export interface INewUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IRequestAuth extends Request {
  user?: IUser;
}
