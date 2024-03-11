import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Message, MessageSchema } from './message.model';
import { User, UserSchema } from '../user/user.model';
import { ConfigModule } from '@nestjs/config';
import { SocketService } from '../socket/socket.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, SocketService],
})
export class MessageModule {}
