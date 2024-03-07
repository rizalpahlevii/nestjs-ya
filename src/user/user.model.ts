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
  birthday: Date;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  zodiac: string;

  @Prop()
  horoscope: string;

  @Prop()
  interests: string[];
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

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export function getZodiacSign(day, month) {
  const zodiacSigns = [
    'Capricorn',
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
  ];
  const dates = [
    [20, 19],
    [20, 18],
    [19, 20],
    [20, 20],
    [20, 20],
    [20, 21],
    [21, 22],
    [22, 22],
    [22, 23],
    [22, 22],
    [21, 21],
    [21, 20],
  ];

  for (let i = 0; i < dates.length; i++) {
    const startMonth = i + 1;
    const [startDay, endDay] = dates[i];

    if (
      (month === startMonth && day >= startDay) ||
      (month === (startMonth % 12) + 1 && day <= endDay)
    ) {
      return zodiacSigns[i];
    }
  }
}

export const getHoroscope = (zodiac: string) => {
  const horoscopes = {
    Aries: 'Ram',
    Taurus: 'Bull',
    Gemini: 'Twins',
    Cancer: 'Crab',
    Leo: 'Lion',
    Virgo: 'Virgin',
    Libra: 'Balance',
    Scorpio: 'Scorpion',
    Sagittarius: 'Archer',
    Capricorn: 'Goat',
    Aquarius: 'Water Bearer',
    Pisces: 'Fish',
  };

  return horoscopes[zodiac];
};
