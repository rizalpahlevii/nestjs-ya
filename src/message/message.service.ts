import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.model';
import { SendMessageDTO } from './message.dto';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async sendMessage(user: any, data: SendMessageDTO): Promise<any> {
    try {
      const receiver = await this.userModel.findOne({
        email: data.receiver_email,
      });
      if (!receiver) {
        throw new BadRequestException('Receiver not found');
      }
      if (user.email === data.receiver_email) {
        throw new BadRequestException('You cannot send a message to yourself');
      }
      const message = await this.messageModel.create({
        message: data.message,
        sender_email: user.email,
        receiver_email: data.receiver_email,
      });
      this.amqpConnection
        .publish('exchange1', 'key1', message)
        .then(() => {
          console.log('Message sent');
        })
        .catch((error) => {
          console.log(error);
        });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async viewMessages(user: any): Promise<any> {
    return this.messageModel.aggregate([
      {
        $match: {
          $or: [{ sender_email: user.email }, { receiver_email: user.email }],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender_email',
          foreignField: 'email',
          as: 'sender',
        },
      },
    ]);
  }
}
