import { Product as productModel } from '../models/product.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
class ProductController {
    async createProduct(req, res, next) {
        try {
            const { title, description, amount, currency = 'INR' } = req.body;
            const { sub } = req.user;
            const images = req.files || [];

            const productImages = await Promise.all(
                images.map(async (image) => {
                    return await uploadToCloudinary(image.path);
                })
            );

            const product = await productModel.create({
                title,
                description,
                price: {
                    amount,
                    currency,
                },
                seller: sub,
                images: productImages,
            });
            if (!product) {
                throw new ApiError(500, 'Failed to create product');
            }

            console.log(
                `Product created successfully with ID: ${product?._id}`
            );

            res.status(201).json(
                new ApiResponse(201, 'Product created successfully', product)
            );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const { q, minPrice, maxPrice, skip = 0, limit = 20 } = req.query;

            const filter = {};

            if (q) {
                filter.title = { $regex: q, $options: 'i' };
            }

            if (minPrice) {
                filter['price.amount'] = { $gte: Number(minPrice) };
            }

            if (maxPrice) {
                filter['price.amount'] = { $lte: Number(maxPrice) };
            }

            const products = await productModel
                .find(filter)
                .skip(skip)
                .limit(limit);

            res.status(200).json(
                new ApiResponse(200, 'Products fetched successfully', products)
            );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export const productController = new ProductController();
