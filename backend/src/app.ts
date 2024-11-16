import express, { Request, Response, json, urlencoded } from "express";
import env from "@/utils/validateEnv";
import cors from "cors";
import { mw } from "request-ip";

import { errorHandlerMiddleware } from "@/middlewares";
import ApiError from "@/errors/apiError";

// Routes
import V1Router from "./routes/v1";

const app = express();

// Middlewares
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));

// Request IP middleware to get the IP address of the client
app.use(mw());

// CORS configuration to allow only specific origins
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (env.ALLOWED_ORIGINS.split(",").includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// CORS middleware
app.use(cors(corsOptions));
app.set("trust proxy", 1);

// Routes
app.use("/api/v1", V1Router);

// Health check route
app.get("/health", (_, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
  throw new ApiError({
    status: 404,
    message: "Not Found",
    errors: [
      {
        message: `Cannot ${req.method} ${req.originalUrl}`,
      },
    ],
  });
});

//handle all errors
app.use(errorHandlerMiddleware);

export default app;
