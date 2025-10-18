import { body } from 'express-validator';

const createProductValidationSchema = () => [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .trim()
        .isLength({ min: 3, max: 500 })
        .withMessage('Description must be between 3 and 500 characters long'),
    body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isNumeric()
        .withMessage('Amount must be a number')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be greater than 0'),
    body('currency')
        .optional()
        .isIn(['USD', 'INR'])
        .withMessage('Currency must be USD or INR'),
];

export { createProductValidationSchema };
