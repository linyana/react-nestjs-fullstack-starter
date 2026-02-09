import { PERMISSION } from '.';

export type PERMISSION_TYPE = (typeof PERMISSION)[keyof typeof PERMISSION];
