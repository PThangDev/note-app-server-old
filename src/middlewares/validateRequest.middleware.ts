import { NextFunction, Request, Response } from 'express';
import { validateAccount, validateEmail, validateUsername } from '../utils';

export const validateResgier = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const errors = [];
    if (!username.trim()) {
      errors.push({ username: 'Username is required' });
    } else if (username.length > 15 || username.length < 6) {
      errors.push({ username: 'Username must have at 6-15 characters' });
    } else if (!validateUsername(username)) {
      errors.push({ username: 'Username cannot contain special characters' });
    }

    if (!password.trim()) {
      errors.push({ password: 'Password is required' });
    } else if (password.length > 30 || password.length < 6) {
      errors.push({ password: 'Password must have at 6-30 characters' });
    }

    if (!email.trim()) {
      errors.push({ email: 'Email is required' });
    } else if (!validateEmail(email)) {
      errors.push({ email: 'Invalid Email' });
    }

    if (errors.length) {
      throw errors;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { account, password } = req.body;
    const errors = [];
    if (!account.trim()) {
      errors.push({ account: 'Account is required' });
    } else if (!validateAccount(account)) {
      errors.push({ account: 'Invalid. Account must be an Email or Username' });
    }
    if (!password.trim()) {
      errors.push({ password: 'Password is required' });
    } else if (password.length > 30 || password.length < 6) {
      errors.push({ password: 'Password must have at 6-30 characters' });
    }

    if (errors.length) {
      throw errors;
    }
    next();
  } catch (error) {
    next(error);
  }
};
