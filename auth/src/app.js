import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
import authRoutes from './routes/auth.routes.js';

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/auth', authRoutes);
export default app;
