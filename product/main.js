import app from './src/app.js';
import { config } from './src/config/env.config.js';
import { connectDB } from './src/db/db.js';

const PORT = config.SERVER.PORT;
const HOST = config.SERVER.HOST;
const PROTOCOL = config.SERVER.PROTOCOL;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Product server running on ${PROTOCOL}://${HOST}:${PORT}`
            );
        });
    })
    .catch((err) => {
        console.error(
            `Database connection error while starting product server: ${err}`
        );
    });
