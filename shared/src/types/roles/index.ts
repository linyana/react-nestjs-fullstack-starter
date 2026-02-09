import { ROLE } from '../../constants';

export type ROLE_TYPE = (typeof ROLE)[keyof typeof ROLE];
