import mongoose from 'mongoose';
import { config } from '../config/env.config.js';
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.DATABASE.URL);
    console.log(`Database connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};

export { connectDB };
