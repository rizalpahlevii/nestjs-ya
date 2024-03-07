import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserProfile {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  bio: string;

  @Prop()
  birthdate: Date;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({ lowercase: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  profile: UserProfile;

  @Prop()
  interests: string[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
