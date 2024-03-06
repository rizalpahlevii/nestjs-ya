import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as RequestType, Response } from 'express';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getProfile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: RequestType): Promise<any> {
    const user = request.user;
    return this.userService.getUserByUsername(user.username);
  }

  @Post('createProfile')
  @UseGuards(AuthGuard)
  async createProfile(@Res() res: Response): Promise<any> {
    res.json({ message: 'Profile created' });
  }

  @Put('updateProfile')
  @UseGuards(AuthGuard)
  async updateProfile(@Res() res: Response): Promise<any> {
    res.json({ message: 'Profile updated' });
  }
}
