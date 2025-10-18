import { Router } from 'express';

import { registerUserValidationSchema } from '../validations/auth.validation.js';
import { validate } from '../middleware/validation.middleware.js';
import { authController } from '../controllers/auth.controller.js';

const router = Router();

router
    .route('/register')
    .post(
        registerUserValidationSchema(),
        validate,
        authController.registerUser
    );

export default router;
