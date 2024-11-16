import morgan, { StreamOptions } from "morgan";
import logger from "./winston.logger";
import env from "@/utils/validateEnv";

const stream: StreamOptions = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = (): boolean => {
  return !env.isDev;
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
