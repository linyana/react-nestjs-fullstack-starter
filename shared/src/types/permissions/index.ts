import { PERMISSION } from '../../constants';

export type PERMISSION_TYPE = (typeof PERMISSION)[keyof typeof PERMISSION];
