import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/model/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(data): Promise<{ message: string; user: User }> {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userModel.create(data);
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(data): Promise<{ message: string; token: string }> {
    try {
      const user = await this.userModel.findOne({ username: data.username });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        throw new NotFoundException('Invalid password');
      }

      const payload = { username: user.username, sub: user._id };
      const token = this.jwtService.sign(payload);
      return {
        message: 'User logged in successfully',
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }
}
