import { logger } from "@/logger";
import { config } from ".";
import { ModelCtor, Sequelize } from "sequelize-typescript";
import env from "@/utils/validateEnv";
import * as models from "@/models";

const dbConfig = config.db.getCurrentDB();

/**
 * @description Create a new Sequelize instance
 * */
const sequelize = new Sequelize({
  database: dbConfig.dbName,
  dialect: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  models: [],
  logging: env.isDev ? console.log : false,
});

/**
 * @description Load all models and nested models
 * @returns {Promise<void>}
 * */
const loadModelsAndNestedModels = async (): Promise<void> => {
  // get all models, convert to array and add to sequelize
  const allModels: ModelCtor[] = [];

  allModels.push(...Object.values(models));

  sequelize.addModels(allModels);
};

/**
 * @description Connect to database
 * @returns {Promise<void>}
 * */
export const connectDB = async (): Promise<void> => {
  try {
    await loadModelsAndNestedModels();

    /**
     * authenticate
     * @description Test connection to database
     */
    await sequelize.authenticate();
    logger.info(`Database connected successfully at ${dbConfig.host}`);

    /**
     * @description sync all models with database
     * @param {boolean} force - If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
     * @param {boolean} alter - If alter is true, existing tables will be altered.
     * */
    await sequelize.sync({ force: env.isTest, alter: env.isTest });
    logger.info("All models were synchronized successfully.");
  } catch (error) {
    logger.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;
