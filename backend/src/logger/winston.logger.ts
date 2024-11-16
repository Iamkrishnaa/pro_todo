import winston, { format as _format, transports as _transports } from "winston";
import env from "@/utils/validateEnv";
import { rootDir } from "@/utils/fileStorageUtil";

// Log levels
const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): string => {
  return env.isDev ? "debug" : "warn";
};

// Chose the aspect of your log customizing the log format.
const format = _format.combine(
  // Add the message timestamp with the preferred format
  _format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
  // Define the format of the message showing the timestamp, the level and the message
  _format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  new _transports.File({
    filename: `${rootDir}/logs/error.log`,
    level: "error",
  }),

  new _transports.File({
    filename: `${rootDir}/logs/combined.log`,
  }),

  // Allow the use the console to print the messages
  new _transports.Console(),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

export default logger;
