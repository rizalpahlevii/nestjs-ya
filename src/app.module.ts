import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/response.interceptor';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_NAME,
    }),
    SocketModule,
    UserModule,
    AuthModule,
    MessageModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransformInterceptor, SocketService],
})
export class AppModule {}
