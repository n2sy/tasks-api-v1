import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('sigin')
  async inscription(@Body() credentials) {
    return await this.authSer.signin(credentials);
  }
}
