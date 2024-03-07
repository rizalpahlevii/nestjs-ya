import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as RequestType } from 'express';
import { TransformInterceptor } from '../common/response.interceptor';
import { CreateProfileDTO } from './user.dto';
import { ResponseMessage } from '../common/response_message.decorator';

@Controller()
@UseInterceptors(TransformInterceptor)
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
  @ResponseMessage('Profile created')
  async createProfile(
    @Body() createProfileDTO: CreateProfileDTO,
    @Req() request: RequestType,
  ): Promise<any> {
    const user = request.user;
    await this.userService.createProfile(user.username, createProfileDTO);
  }

  @ResponseMessage('Profile updated')
  @Put('updateProfile')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() createProfileDTO: CreateProfileDTO,
    @Req() request: RequestType,
  ): Promise<any> {
    const user = request.user;
    await this.userService.updateUserProfile(user.username, createProfileDTO);
  }
}
