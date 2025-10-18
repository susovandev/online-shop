import dotenv from "dotenv";
dotenv.config("../../.env");

const _config = {
  SERVER: {
    PORT: process.env.PORT || 4002,
    HOST: process.env.HOST || "localhost",
    ENV: process.env.NODE_ENV || "development",
    PROTOCOL: process.env.PROTOCOL || "http",
  },
};

export const config = Object.freeze(_config);
