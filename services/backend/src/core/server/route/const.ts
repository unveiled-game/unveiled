import { Methods } from "#/utils/http";
import type { ObjectValues } from "@packages/devx";


export type ALLOWED_METHODS = typeof ALLOWED_METHODS[number];
export const ALLOWED_METHODS = [
  Methods.GET,
  Methods.POST,
  Methods.PATCH,
  Methods.DELETE
] as const satisfies Array<Methods>;

export type METHODS_WITHOUT_BODY = typeof METHODS_WITHOUT_BODY[number];
export const METHODS_WITHOUT_BODY = [
  Methods.GET,
  Methods.DELETE
] as const satisfies Array<ALLOWED_METHODS>;

export type APIError = ObjectValues<typeof APIError>;
export const APIError = {
} as const;