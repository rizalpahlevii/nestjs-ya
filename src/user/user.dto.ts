import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsString({ each: true })
  interests: string[];
}
