import { Router } from 'express';

import {
    registerUserValidationSchema,
    loginUserValidationSchema,
} from '../validations/auth.validation.js';
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
router
    .route('/login')
    .post(loginUserValidationSchema(), validate, authController.loginUser);
export default router;
