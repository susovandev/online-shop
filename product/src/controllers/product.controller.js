import mongoose from 'mongoose';
import { Product as productModel } from '../models/product.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { cloudinaryService } from '../utils/cloudinary.js';
class ProductController {
    async createProduct(req, res, next) {
        try {
            const { title, description, amount, currency = 'INR' } = req.body;
            const { sub } = req.user;
            const images = req.files || [];

            const productImages = await Promise.all(
                images.map(async (image) => {
                    return await cloudinaryService.uploadToCloudinary(
                        image.path
                    );
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

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ApiError(400, 'Invalid product ID');
            }

            const product = await productModel.findById(id);

            if (!product) {
                throw new ApiError(404, 'Product not found');
            }

            res.status(200).json(
                new ApiResponse(200, 'Product fetched successfully', product)
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { sub } = req.user;
            const { title, description, amount } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ApiError(400, 'Invalid product ID');
            }

            const product = await productModel.findOne({
                _id: id,
                seller: sub,
            });

            if (!product) {
                throw new ApiError(404, 'Product not found');
            }

            if (title) product.title = title;
            if (description) product.description = description;
            if (amount) product.price.amount = amount;

            await product.save({ validateBeforeSave: false });

            res.status(200).json(
                new ApiResponse(200, 'Product updated successfully', product)
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async deleteProductById(req, res, next) {
        try {
            const { id } = req.params;
            const { sub } = req.user;

            if (
                !mongoose.Types.ObjectId.isValid(id) ||
                !mongoose.Types.ObjectId.isValid(sub)
            ) {
                throw new ApiError(400, 'Invalid product ID');
            }

            const product = await productModel.findOne({
                _id: id,
                seller: sub,
            });

            if (!product) {
                throw new ApiError(404, 'Product not found');
            }

            await Promise.all(
                product.images.map(async (image) => {
                    await cloudinaryService.deleteFromCloudinary(
                        image?.public_id
                    );
                })
            );

            await product.deleteOne({ _id: id });

            console.log(`Product deleted successfully with ID: ${id}`);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export const productController = new ProductController();
