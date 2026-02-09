import { ENV_TYPE } from "./types";

export const getEnv = (key: ENV_TYPE): string | undefined => {
  return process.env[key];
};
