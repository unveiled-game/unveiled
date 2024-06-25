import type { Format } from "#/utils/style-text/type";
import { styleText as st } from "node:util";


/**
 * starting from Node v20.13.0 styleText() supports array of formats
 * @see https://github.com/oven-sh/bun/issues/11705
 * @see https://github.com/oven-sh/bun/pull/12082
 * @see https://nodejs.org/en/blog/release/v20.13.0#util-support-array-of-formats-in-utilstyletext
 */
export const styleText = (format: Format | Format[], text: string): string => {
  if (Array.isArray(format) === false) return st(format, text);

  for (const style of format) {
    text = st(style, text);
  }

  return text;
};