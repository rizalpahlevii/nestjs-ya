import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  logger: Logger;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async update(id: string, updateUserDto: any): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      upsert: true,
    });
  }

  async create(createUserDto: any): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id);
  }
}
