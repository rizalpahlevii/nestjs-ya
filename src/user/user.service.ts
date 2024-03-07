import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './user.dto';
import { getHoroscope, getZodiacSign, User } from './user.model';

interface UserResponse {
  username: string;
  email: string;
  profile: UserProfileResponse;
}

interface UserProfileResponse {
  name: string;
  image: string;
  bio: string;
  birthdate: Date;
  height: number;
  weight: number;
  interests: string[];
}

@Injectable()
export class UserService {
  logger: Logger;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string) {
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
      const user = await this.userModel.findOne({ username });
      if (!user.profile) {
        throw new BadRequestException('Profile does not exist, use create');
      }
      const date = new Date(updateProfileDTO.birthday);
      updateProfileDTO.zodiac = getZodiacSign(
        date.getDay(),
        date.getMonth() + 2,
      );
      updateProfileDTO.horoscope = getHoroscope(updateProfileDTO.zodiac);
      console.log(updateProfileDTO);
      return this.userModel.updateOne(
        { username: username },
        { $set: { profile: updateProfileDTO } },
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
      const user = await this.userModel.findOne({ username });
      if (user.profile) {
        throw new BadRequestException('Profile already exists, use update');
      }
      const date = new Date(createProfileDTO.birthday);
      createProfileDTO.zodiac = getZodiacSign(
        date.getDay(),
        date.getMonth() + 1,
      );
      createProfileDTO.horoscope = getHoroscope(createProfileDTO.zodiac);
      return this.userModel.updateOne(
        { username: username },
        { $set: { profile: createProfileDTO } },
        { upsert: true },
      );
    } catch (e) {
      throw e;
    }
  }
}
