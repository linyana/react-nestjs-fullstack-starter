import { SetMetadata } from '@nestjs/common';
import { IRoleType } from '@projectname/shared';

export const Roles = (...roles: IRoleType[]) => SetMetadata('roles', roles);
