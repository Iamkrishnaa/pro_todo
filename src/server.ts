import "module-alias/register";
import { createServer } from "http";
import env from "@/utils/validateEnv";
import connectDB from "@/config/db.config";
import { logger } from "@/logger";

import app from "@/app";

/**
 * Initializes and starts the HTTP server.
 *
 * @async
 * @function initializeServer
 * @returns {Promise<void>} A promise that resolves when the server is successfully started.
 */
const initializeServer = async (): Promise<void> => {
  const httpServer = createServer(app);

  const PORT = env.APP_PORT || 8080;
  httpServer.listen(PORT, () => {
    logger.info(` Server is running on port http://localhost:${PORT}`);
  });
};

(async () => {
  try {
    /**
     * Connects to the database and initializes the server.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the database is connected and the server is started.
     */
    await connectDB();
    await initializeServer();
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
    process.exit(1);
  }
})();
