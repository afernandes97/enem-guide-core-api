import { IsString } from 'class-validator';

export class CreateUserHistoryDto {
  @IsString()
  userId?: string;

  @IsString()
  type: string;

  @IsString()
  message: string;

  @IsString()
  discipline: string;
}
