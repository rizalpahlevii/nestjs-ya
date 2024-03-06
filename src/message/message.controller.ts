import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class MessageController {
  @Post('sendMessage')
  async sendMessage() {}

  @Get('viewMessages')
  async viewMessage() {}
}
