import { User as userModel } from '../models/user.model.js';
import { config } from '../config/env.config.js';
import { signAccessToken } from '../utils/token.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
class AuthController {
    async registerUser(req, res, next) {
        try {
            const {
                username,
                email,
                password,
                fullName: { firstName, lastName },
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
}

export const authController = new AuthController();
