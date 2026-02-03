import { PERMISSION } from '../../constants';

export type IPermissionType = (typeof PERMISSION)[keyof typeof PERMISSION];
