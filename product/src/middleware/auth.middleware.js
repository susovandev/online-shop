import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { config } from '../config/env.config.js';

const createAuthMiddleware = (roles = ['user']) => {
    return (req, res, next) => {
        const accessToken =
            req.cookies?.accessToken ||
            req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            throw new ApiError(401, 'You are not logged in');
        }
        try {
            const decodedToken = jwt.decode(
                accessToken,
                config.TOKEN.ACCESS_TOKEN_SECRET
            );

            console.log(decodedToken.role);
            if (!decodedToken) {
                throw new ApiError(401, 'You are unauthorized user');
            }
            if (!roles.includes(decodedToken?.role)) {
                throw new ApiError(
                    403,
                    'You are not authorized user for this action'
                );
            }
            req.user = decodedToken;
            next();
        } catch (error) {
            console.error(`Error in auth middleware: ${error}`);
            throw new ApiError(401, 'You are unauthorized user');
        }
    };
};
export { createAuthMiddleware };
