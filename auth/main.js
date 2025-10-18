import app from './src/app.js';
import { config } from './src/config/env.config.js';
import { connectDB } from './src/db/db.js';

const PORT = config.SERVER.PORT;
const HOST = config.SERVER.HOST;
const PROTOCOL = config.SERVER.PROTOCOL;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`);
        });
    })
    .catch(error =>
        console.error(
            `Database connection error while starting server: ${error}`
        )
    );
