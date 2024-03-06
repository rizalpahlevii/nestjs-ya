import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  logger: Logger;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      username,
    });
  }
}
