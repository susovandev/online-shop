import { Router } from 'express';

import {
    registerUserValidationSchema,
    loginUserValidationSchema,
} from '../validations/auth.validation.js';
import { validate } from '../middleware/validation.middleware.js';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

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
router.route('/me').get(authMiddleware, authController.me);
export default router;
