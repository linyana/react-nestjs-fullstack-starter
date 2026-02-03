import { ROLE } from '../../constants';

export type IRoleType = (typeof ROLE)[keyof typeof ROLE];
