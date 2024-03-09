import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/response.interceptor';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_NAME,
    }),
    UserModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransformInterceptor],
})
export class AppModule {}
