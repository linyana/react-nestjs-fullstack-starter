import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public, Payload, Roles } from '@/common';
import { LoginUserDto } from './dto/login';
import { ILoginResponseType } from '@projectname/shared';
import { IPayloadType } from '@/common/decorators/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sessions')
  @Public()
  login(@Body() { email, password }: LoginUserDto): Promise<ILoginResponseType> {
    return this.authService.login(email, password);
  }

  @Post('admin/sessions')
  @Public()
  adminLogin(@Body() { email, password }: LoginUserDto): Promise<ILoginResponseType> {
    return this.authService.adminLogin(email, password);
  }

  @Get()
  @ApiBearerAuth()
  @Roles('Admin', 'Staff')
  async auth(
    @Payload('userId') userId: IPayloadType['userId'],
    @Payload('adminUserId') adminUserId: IPayloadType['adminUserId'],
  ) {
    return this.authService.auth({
      userId,
      adminUserId,
    });
  }
}
