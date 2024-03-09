import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  receiver_email: string;
}
