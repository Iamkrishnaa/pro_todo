/**
 * Loads environment variables from a .env file into process.env.
 */
import "dotenv/config";

/**
 * Validates and cleans environment variables.
 * Ensures that the required environment variables are present and have the correct type.
 */
import { cleanEnv, port, str } from "envalid";

/**
 * Validates the environment variables and exports the cleaned environment object.
 * @property {string} APP_NAME - The name of the application.
 * @property {number} APP_PORT - The port on which the application runs.
 * @property {string} APP_URL - The URL of the application.
 * @property {string} CLIENT_URL - The URL of the client.
 * @property {string} NODE_ENV - The environment in which the application is running (development, production, etc.).
 * @property {string} ALLOWED_ORIGINS - The allowed origins for CORS.
 * @property {string} DB_HOST - The database host.
 * @property {number} DB_PORT - The database port.
 * @property {string} DB_NAME - The database name.
 * @property {string} DB_USER - The database user.
 * @property {string} DB_PASSWORD - The database password.
 * @property {string} DB_HOST_DEV - The development database host.
 * @property {number} DB_PORT_DEV - The development database port.
 * @property {string} DB_NAME_DEV - The development database name.
 * @property {string} DB_USER_DEV - The development database user.
 * @property {string} DB_PASSWORD_DEV - The development database password.
 * @property {string} DB_HOST_TEST - The test database host.
 * @property {number} DB_PORT_TEST - The test database port.
 * @property {string} DB_NAME_TEST - The test database name.
 * @property {string} DB_USER_TEST - The test database user.
 * @property {string} DB_PASSWORD_TEST - The test database password.
 */
export default cleanEnv(process.env, {
  APP_NAME: str(),
  APP_PORT: port(),
  APP_URL: str(),

  CLIENT_URL: str(),
  NODE_ENV: str(),
  ALLOWED_ORIGINS: str(),

  // Database configuration
  DB_HOST: str(),
  DB_PORT: port(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),

  DB_HOST_DEV: str(),
  DB_PORT_DEV: port(),
  DB_NAME_DEV: str(),
  DB_USER_DEV: str(),
  DB_PASSWORD_DEV: str(),

  DB_HOST_TEST: str(),
  DB_PORT_TEST: port(),
  DB_NAME_TEST: str(),
  DB_USER_TEST: str(),
  DB_PASSWORD_TEST: str(),
});
