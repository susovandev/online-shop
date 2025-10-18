import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { config } from '../config/env.config.js';

const authMiddleware = async (req, _res, next) => {
    const accessToken =
        req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
        throw new ApiError(401, 'You are not logged in');
    }
    try {
        const decodedToken = jwt.verify(
            accessToken,
            config.TOKEN.ACCESS_TOKEN_SECRET
        );
        console.log(`decodedToken: ${JSON.stringify(decodedToken)}`);
        if (!decodedToken) {
            throw new ApiError(401, 'You are unauthorized user');
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(`Error in auth middleware: ${error}`);
        next(error);
    }
};

export { authMiddleware };
