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
    body('role')
        .optional()
        .isIn(['user', 'seller'])
        .withMessage('Role must be user or seller'),
];

const loginUserValidationSchema = () => [
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
];

const userAddressValidationSchema = () => [
    body('street')
        .notEmpty()
        .withMessage('Street is required')
        .isString()
        .withMessage('Street must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Street must be between 3 and 50 characters long'),
    body('city')
        .notEmpty()
        .withMessage('City is required')
        .isString()
        .withMessage('City must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('City must be between 3 and 50 characters long'),
    body('state')
        .notEmpty()
        .withMessage('State is required')
        .isString()
        .withMessage('State must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('State must be between 3 and 50 characters long'),
    body('zip')
        .notEmpty()
        .withMessage('Zip is required')
        .isString()
        .withMessage('Zip must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Zip must be between 3 and 50 characters long'),
    body('country')
        .notEmpty()
        .withMessage('Country is required')
        .isString()
        .withMessage('Country must be a string')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Country must be between 3 and 50 characters long'),
];
export {
    registerUserValidationSchema,
    loginUserValidationSchema,
    userAddressValidationSchema,
};
