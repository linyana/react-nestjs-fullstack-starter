import { PLATFORM_TYPE } from "@projectname/shared";
import { Method } from "axios";

export type IHttpRequestType = {
  method: Method;
  platform: PLATFORM_TYPE;
  url: string;
  data?: { [key in string]: any };
  params?: { [key in string]: any };
  headers?: { [key in string]: any };
  needHandleError?: boolean;
};
