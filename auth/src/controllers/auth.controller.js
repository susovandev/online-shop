import { User as userModel } from '../models/user.model.js';
import { config } from '../config/env.config.js';
import { signAccessToken } from '../utils/token.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { redisClient } from '../db/redis.js';
class AuthController {
    async registerUser(req, res, next) {
        /**
         * Get username, email, password and full name from the request body
         * Check if the user already exists in the database
         * if(user exists) :
         *    throw error
         * else :
         *    Create user
         *    Generate access token
         *    Send access token in the response
         */
        try {
            const {
                username,
                email,
                password,
                fullName: { firstName, lastName },
                role,
            } = req.body;

            const isUserAlreadyExists = await userModel.findOne({
                $or: [{ username }, { email }],
            });

            if (isUserAlreadyExists) {
                throw new ApiError(409, 'User already exists');
            }

            const newUser = await userModel.create({
                username,
                email,
                password,
                fullName: {
                    firstName,
                    lastName,
                },
                rol: role || 'user',
            });

            const accessToken = signAccessToken(newUser);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: config.SERVER.ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24,
            })
                .status(201)
                .json(
                    new ApiResponse(201, 'Account created successfully', {
                        accessToken,
                    })
                );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async loginUser(req, res, next) {
        /**
         * Get email and password from the request body
         * Check if the user exists in the database
         * if(user exists) :
         *    Check if the password is correct
         *    if(password is correct) :
         *        Generate access token
         *        Send access token in the response
         *    else :
         *        throw error
         * else :
         *    throw error
         */
        try {
            const { email, password } = req.body;

            const isUserAlreadyExits = await userModel
                .findOne({ email })
                .select('+password');
            if (!isUserAlreadyExits) {
                throw new ApiError(409, 'Invalid credentials');
            }

            const isPasswordCorrect =
                await isUserAlreadyExits.comparePassword(password);
            if (!isPasswordCorrect) {
                throw new ApiError(409, 'Invalid credentials');
            }

            const accessToken = signAccessToken(isUserAlreadyExits);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: config.SERVER.ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24,
            })
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        `Welcome back ${isUserAlreadyExits.username}`,
                        {
                            accessToken,
                        }
                    )
                );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async getCurrentUser(req, res, next) {
        /**
         * Get user id from the request user
         * Find user in the database
         * if(user exists) :
         *    Send user in the response
         * else :
         *    throw error
         */
        try {
            const { sub } = req.user;
            const user = await userModel.findById(sub).select('-password');
            if (!user) {
                throw new ApiError(401, 'You are not authenticated user');
            }
            res.status(200).json(new ApiResponse(200, 'Success', user));
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async logout(req, res, next) {
        /**
         * Get access token from the request cookies
         * if(access token exists) :
         *    Blacklist access token from the redis
         *    Send response
         */
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                throw new ApiError(401, 'You are not logged in');
            }
            await redisClient.set(
                `logout:${accessToken}`,
                'true',
                'EX',
                24 * 60 * 60
            );
            res.clearCookie('accessToken')
                .status(200)
                .json(new ApiResponse(200, 'Logged out successfully'));
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export const authController = new AuthController();
