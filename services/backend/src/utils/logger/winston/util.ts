import { dayJS } from "#/utils/day-js";
import { Levels } from "./const";
import { format, transports } from "winston";
import { st } from "#/utils/style-text";


export const transportList = {
  console: new transports.Console({
    format: format.printf(({ level, message }) => {
      const datetime = dayJS().format("YYYY-MM-DD HH:mm:ss.SSS");

      const color = ({
        error: ["bold", "redBright"],
        warn: ["bold", "yellowBright"],
        info: ["bold", "blueBright"],
        success: ["bold", "greenBright"]
      } satisfies Record<Levels, Parameters<typeof st>[0]>)[level as Levels];

      const maxLevelLength = Math.max(...Object.keys(Levels).map(value => value.length));
      const separatorLength = maxLevelLength - level.length + 2;

      const texts = {
        date: st("dim", `${datetime}`),
        level: st(color, level.toUpperCase()),
        separator: st("dim", `${"-".repeat(separatorLength)}»`),
        message: `${message}`
      } as const;

      return `${texts.date} ${texts.level} ${texts.separator} ${texts.message}`;
    })
  })
} as const;