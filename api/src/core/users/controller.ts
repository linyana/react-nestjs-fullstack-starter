import { Controller } from '@nestjs/common';
import { UsersService } from './service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
}
