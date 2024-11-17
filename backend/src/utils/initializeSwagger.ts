import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";
import { rootDir } from "./fileStorageUtil";

console.log(`${rootDir}/swagger.yaml`);

const swaggerDoc = yaml.parse(
  fs.readFileSync(`${rootDir}/swagger.yaml`, "utf8")
);

const initializeSwagger = (app: express.Application) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
      swaggerOptions: {
        docExpansion: "none",
      },
      customSiteTitle: "Pro Todo API Documentation",
    })
  );
};

export default initializeSwagger;
