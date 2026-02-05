import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { IPayloadType } from './types';

export const Payload = (key: keyof IPayloadType | undefined): ParameterDecorator => {
  return createParamDecorator((_, ctx) => {
    const req = ctx.switchToHttp().getRequest<{ user: IPayloadType }>();
    const user = req.user;
    if (!user) throw new BadRequestException('Missing user payload');

    if (key === undefined) return user;
    const value = user[key];
    if (value == null) return undefined;
    return value;
  })();
};
