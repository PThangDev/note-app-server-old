import { Request } from 'express';

export type TypeLogin = 'register' | 'google' | 'facebook';
export type RoleUser = 'admin' | 'customer';
export type StatusUser = 'pending' | 'active' | 'banned';

export type TypeNote = 'default' | 'pin' | 'trash';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: RoleUser;
  type: TypeLogin;
  status: StatusUser;
  _doc: object;
}
export interface ITopic extends Document {
  _id: string;
  user: string;
  thumnail: string;
  _doc: object;
}

export interface INote extends Document {
  _id: string;
  user: string;
  topics: ITopic[];
  thumbnail: string;
  background: string;
  title: string;
  content: string;
  type: TypeNote;
  _doc: object;
}
export interface INoteUpdate {
  title?: string;
  thumbnail?: string;
  background?: string;
  content?: string;
  topics?: string;
  slug?: string;
  type?: TypeNote;
}

export interface INewTopic extends Document {
  name: string;
  thumbnail?: string;
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

export interface IQueryString {
  limit?: string | number;
  page?: string | number;
  sort?: string;
  search?: string;
}
