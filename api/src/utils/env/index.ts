import { IEnvType } from "./types";

export const env = (key: IEnvType): string | undefined => {
  return process.env[key];
};
