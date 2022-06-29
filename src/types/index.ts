import { Request } from 'express';

export type TypeLogin = 'register' | 'google' | 'facebook';
export type RoleUser = 'admin' | 'customer';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: RoleUser;
  type: TypeLogin;
  _doc: object;
}
export interface ITopic extends Document {
  _id: string;
  user: string;
  thumnail: string;
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
  _id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IChangePassword {
  user: IUser;
  oldPassword: string;
  newPassword: string;
}

export interface IRequestAuth extends Request {
  user?: IUser;
}
