import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ message: string; token: string }> {
    const data = {
      username: body.username,
      password: body.password,
    };
    return await this.authService.login(data);
  }

  @Post('register')
  async register(
    @Body() body: { email: string; username: string; password: string },
  ): Promise<{ message: string; user: any }> {
    const data = {
      email: body.email,
      username: body.username,
      password: body.password,
    };
    return await this.authService.register(data);
  }
}
