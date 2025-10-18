import jwt from 'jsonwebtoken';
import { config } from '../config/env.config.js';
export const signAccessToken = (user) => {
    try {
        return jwt.sign(
            { sub: user._id, role: user.role },
            config.TOKEN.ACCESS_TOKEN_SECRET,
            {
                expiresIn: config.TOKEN.ACCESS_TOKEN_EXPIRES_IN,
            }
        );
    } catch (error) {
        throw error;
    }
};
