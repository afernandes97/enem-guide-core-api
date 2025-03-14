import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateUserPreferencesDto {
  @ApiProperty({ description: 'ID do usuário', required: false }) // Agora está explícito que é opcional
  @IsString()
  @IsOptional() // Indica que esse campo é opcional
  userId?: string;

  @ApiProperty({ description: 'Idade do usuário', example: 25 })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ description: 'Média acadêmica do usuário', example: 8 })
  @IsInt()
  @Min(0)
  @Max(10)
  academyAverage: number;

  @ApiProperty({
    description: 'Idioma selecionado pelo usuário',
    required: false,
    example: 'pt',
  })
  @IsString()
  selectedLanguage: string;

  @ApiProperty({ description: 'Ano escolar do usuário', example: 10 })
  @IsInt()
  schoolYear: number;

  @ApiProperty({
    description: 'Objetivo educacional do usuário',
    example: 'Passar no vestibular',
  })
  @IsString()
  objective: string;

  @ApiProperty({ description: 'Horas de estudo por dia', example: 4 })
  @IsInt()
  studyHoursPerDay: number;

  @ApiProperty({
    description: 'Matéria favorita do usuário',
    example: 'Matemática',
  })
  @IsString()
  favoriteSubject: string;

  @ApiProperty({
    description: 'Matéria considerada difícil pelo usuário',
    example: 'Física',
  })
  @IsString()
  difficultMaterial: string;
}
