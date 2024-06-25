import type { ObjectValues } from "#/utils/object/typing";


export type Environment = ObjectValues<typeof Environment>;
export const Environment = {
  DEV: "DEV",
  PROD: "PROD"
} as const;