import { SetMetadata } from '@nestjs/common';
import { ROLE_TYPE } from '@projectname/shared';

export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata('roles', roles);
