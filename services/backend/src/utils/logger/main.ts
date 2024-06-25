import { winstonLogger } from "./winston";


export const logger = {
  error: (message: string, stack?: string): void => {
    winstonLogger.log("error", `${message}${stack ? `\n${stack}` : ""}`);
  },

  warn: (message: string): void => {
    winstonLogger.warn(message);
  },

  info: (message: string): void => {
    winstonLogger.info(message);
  },

  success: (message: string): void => {
    winstonLogger.log("success", message);
  }
};