import { IRoleType } from '@projectname/shared';

export type IPayloadType = {
  userId: bigint;
  adminUserId: bigint;
  role: IRoleType;
};
