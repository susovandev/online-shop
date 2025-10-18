import app from './src/app.js';
import { config } from './src/config/env.config.js';

const PORT = config.SERVER.PORT;
const HOST = config.SERVER.HOST;
const PROTOCOL = config.SERVER.PROTOCOL;
app.listen(PORT, () => {
  console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`);
});
