import { Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO } from './auth.dto';

interface LoginResponse {
  id?: any;
  username: string;
  email: string;
  token: string;
}

interface UserResponse {
  id: any;
  username: string;
  email: string;
}

export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO): Promise<UserResponse> {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userModel.create(data);
      return {
        id: user._id,
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(data: LoginDTO): Promise<LoginResponse> {
    try {
      const user = await this.userModel.findOne({ username: data.username });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        throw new NotFoundException('Password does not match');
      }

      const payload = {
        username: user.username,
        sub: user._id,
        email: user.email,
      };
      const token = this.jwtService.sign(payload);
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
