import { ErrorRequestHandler } from 'express';
import { uppercaseFirstLetter } from '../utils';

const errorHandlingMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (err.code === 11000) {
    const fieldError = Object.keys(err.keyValue)[0];
    return res.status(status).json({ message: `${uppercaseFirstLetter(fieldError)} has already exists` });
  }
  return res.status(200).json({ errors: err });
};
export default errorHandlingMiddleware;
