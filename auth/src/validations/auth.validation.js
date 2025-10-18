import { body } from 'express-validator';

const registerUserValidationSchema = () => [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be a string')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid')
        .trim()
        .contains('gmail.com')
        .withMessage('Email must be from gmail.com'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('fullName.firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('First name must be between 3 and 50 characters long'),
    body('fullName.lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Last name must be between 3 and 50 characters long'),
];

export { registerUserValidationSchema };
