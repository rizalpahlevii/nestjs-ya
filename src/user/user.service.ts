import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './user.dto';

@Injectable()
export class UserService {
  logger: Logger;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel
      .findOne({
        username,
      })
      .select('-password -__v');
  }

  async updateUserProfile(
    username: any,
    updateProfileDTO: CreateProfileDTO,
  ): Promise<any> {
    try {
      const interests = updateProfileDTO.interests;
      const user = await this.userModel.findOne({ username });
      if (!user.profile) {
        throw new BadRequestException('Profile does not exist, use create');
      }

      return this.userModel.updateOne(
        { username: username },
        { $set: { profile: updateProfileDTO, interests } },
        { upsert: true },
      );
    } catch (e) {
      throw e;
    }
  }

  async createProfile(
    username: any,
    createProfileDTO: CreateProfileDTO,
  ): Promise<any> {
    try {
      const interests = createProfileDTO.interests;
      const user = await this.userModel.findOne({ username });
      if (user.profile) {
        throw new BadRequestException('Profile already exists, use update');
      }
      return this.userModel.updateOne(
        { username: username },
        { $set: { profile: createProfileDTO, interests } },
        { upsert: true },
      );
    } catch (e) {
      throw e;
    }
  }
}
