import { body, oneOf } from 'express-validator';
import * as yup from 'yup';

// export const registerSchema = yup.object({
//   body: yup.object({
//     username: yup
//       .string()
//       .required('Username is required!')
//       .trim()
//       .min(6, 'Username must have at least 6 characters')
//       .max(30, 'Username must be at most 30 characters')
//       .matches(
//         /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/g,
//         'Username cannot contain special characters!'
//       ),
//     password: yup
//       .string()
//       .required('Password is required')
//       .trim()
//       .min(6, 'Password must have at least 6 characters')
//       .max(15, 'Username must be at most 15 characters'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//   }),
// });
export const registerSchema = [
  body('email').isEmail().withMessage('Invalid email!!').not().isEmpty().withMessage('Email is required'),
  body('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Username must have at 6-15 characters')
    .isAlphanumeric()
    .withMessage('Username cannot contain special characters'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must have at 6-30 characters'),
];
