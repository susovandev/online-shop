import dotenv from 'dotenv';
dotenv.config('../../.env');

const _config = {
    SERVER: {
        PORT: process.env.PORT || 4002,
        HOST: process.env.HOST || 'localhost',
        ENV: process.env.NODE_ENV || 'development',
        PROTOCOL: process.env.PROTOCOL || 'http',
    },
    DATABASE: {
        URL: process.env.DATABASE_URL,
    },
    TOKEN: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET_KEY,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN,
    },
};

export const config = Object.freeze(_config);
