import { Methods } from "#/utils/http";


export const ALLOWED_METHODS = [
  Methods.GET,
  Methods.POST,
  Methods.PATCH,
  Methods.DELETE
] as const satisfies Array<Methods>;