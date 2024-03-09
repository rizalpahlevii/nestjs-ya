import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../common/response.interceptor';
import { Request as RequestType } from 'express';
import { SendMessageDTO } from './message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { MessageService } from './message.service';
import { ResponseMessage } from '../common/response_message.decorator';

@Controller()
@UseInterceptors(TransformInterceptor)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('sendMessage')
  @ResponseMessage('Message sent')
  @UseGuards(AuthGuard)
  async sendMessage(
    @Body() sendMessageDTO: SendMessageDTO,
    @Req() request: RequestType,
  ) {
    const user = request.user;
    return this.messageService.sendMessage(user, sendMessageDTO);
  }

  @Get('viewMessages')
  @UseGuards(AuthGuard)
  async viewMessage(@Req() request: RequestType) {
    const user = request.user;
    return this.messageService.viewMessages(user);
  }
}
