import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateUserPreferencesDto {
  @IsString()
  userId?: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsInt()
  @Min(0)
  @Max(10)
  academyAverage: number;

  @IsOptional()
  @IsString()
  selectedLanguage: string;

  @IsInt()
  schoolYear: number;

  @IsString()
  objective: string;

  @IsInt()
  studyHoursPerDay: number;

  @IsString()
  favoriteSubject: string;

  @IsString()
  difficultMaterial: string;
}
