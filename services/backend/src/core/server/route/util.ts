import type { ErrorResponses } from "./type";


export const isErrorResponse = (value: object): value is ErrorResponses => {
  return true;
};