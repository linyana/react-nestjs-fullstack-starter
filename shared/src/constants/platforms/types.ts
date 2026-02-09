import { PLATFORM } from '.';

export type PLATFORM_TYPE = (typeof PLATFORM)[keyof typeof PLATFORM];
