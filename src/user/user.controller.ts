import { UserService } from './user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as RequestType } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async profile(@Req() request: RequestType): Promise<any> {
    const user = request.user;
    return this.userService.getUserByUsername(user.username);
  }
}
