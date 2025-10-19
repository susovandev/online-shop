import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { createAuthMiddleware } from '../middleware/auth.middleware.js';
import { createProductValidationSchema } from '../validations/product.validation.js';
import { validate } from '../middleware/validation.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router
    .route('/')
    .post(
        createAuthMiddleware(['admin', 'seller']),
        upload.array('images', 5),
        createProductValidationSchema(),
        validate,
        productController.createProduct
    );

router.route('/').get(productController.getAllProducts);

router.route('/:id').get(productController.getProductById);
export default router;
