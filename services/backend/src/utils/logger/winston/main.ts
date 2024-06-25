import { transportList } from "./util";
import { Levels } from "./const";
import { createLogger } from "winston";


export const winstonLogger = createLogger({
  levels: Levels
});

winstonLogger.add(transportList.console);