import { SetMetadata } from '@nestjs/common';
import { ROLE } from '@prisma/client';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
