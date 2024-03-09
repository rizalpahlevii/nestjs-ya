import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop()
  sender_email: string;

  @Prop()
  receiver_email: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
