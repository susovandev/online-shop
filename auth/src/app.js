import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
import authRoutes from './routes/auth.routes.js';
import { ApiError } from './utils/apiError.js';

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/auth', authRoutes);

app.use((req, _res, next) => {
    next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            status: err.success,
            statusCode,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
});
export default app;
