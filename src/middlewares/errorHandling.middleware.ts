import { ErrorRequestHandler } from 'express';
import { uppercaseFirstLetter } from '../utils';

const errorHandlingMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // If error has status code === 11000. It's mean some value has already exist in database
  if (err.code === 11000) {
    const fieldError = Object.keys(err.keyValue)[0];
    return res.status(status).json({ message: `${uppercaseFirstLetter(fieldError)} has already exists` });
  }
  return res.status(status).json({ errors: err });
};
export default errorHandlingMiddleware;
