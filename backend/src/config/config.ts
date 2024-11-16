import env from "@/utils/validateEnv";

/**
 * Database configuration object.
 * Contains the database connection settings.
 * @interface IDbConfig
 */
interface IDbConfig {
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
}

/**
 * Application configuration object.
 * Contains the database settings.
 * @interface IConfig
 */
const config = {
  db: {
    dev: {
      host: env.DB_HOST_DEV,
      port: env.DB_PORT_DEV,
      dbName: env.DB_NAME_DEV,
      user: env.DB_USER_DEV,
      password: env.DB_PASSWORD_DEV,
    },
    test: {
      host: env.DB_HOST_TEST,
      port: env.DB_PORT_TEST,
      dbName: env.DB_NAME_TEST,
      user: env.DB_USER_TEST,
      password: env.DB_PASSWORD_TEST,
    },
    prod: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      dbName: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    },
    /**
     * Returns the current database configuration based on the environment.
     * @returns {IDbConfig} - The database configuration object.
     */
    getCurrentDB(): IDbConfig {
      if (env.isProd) {
        return this.prod;
      }
      if (env.isTest) {
        return this.test;
      }
      return this.dev;
    },
  },
};

export default config;
