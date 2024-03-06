import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { ResponseMessage } from '../common/response_message.decorator';
import { TransformInterceptor } from '../common/response.interceptor';

@Controller()
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Login successful')
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return await this.authService.login(loginDTO);
  }

  @Post('register')
  @ResponseMessage('User registered successfully')
  async register(@Body() registerDTO: RegisterDTO): Promise<any> {
    return await this.authService.register(registerDTO);
  }
}
