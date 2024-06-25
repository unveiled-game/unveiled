export type Levels = keyof typeof Levels;
export const Levels = {
  error: 0,
  warn: 1,
  info: 2,
  success: 2
} as const;