import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: {
                success: false,
                statusCode: 400,
                message: 'Validation failed',
                errors: errors.array(),
            },
        });
    }
    next();
};

export { validate };
