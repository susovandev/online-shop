import { Router } from 'express';

import {
    registerUserValidationSchema,
    loginUserValidationSchema,
    userAddressValidationSchema,
} from '../validations/auth.validation.js';
import { validate } from '../middleware/validation.middleware.js';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addressController } from '../controllers/address.controller.js';

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
router.route('/logout').post(authController.logout);

router.route('/users/me').get(authMiddleware, authController.getCurrentUser);

// Address Routes
router
    .route('/users/me/address')
    .post(
        userAddressValidationSchema(),
        validate,
        authMiddleware,
        authMiddleware,
        addressController.addUserAddress
    )
    .get(authMiddleware, addressController.getUserAddresses);
router
    .route('/users/me/address/:addressId')
    .delete(authMiddleware, addressController.deleteUserAddress);

export default router;
