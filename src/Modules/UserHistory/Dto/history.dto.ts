import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserHistoryDto {
  @ApiProperty({
    description: 'Id do usuario',
  })
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'Tipo de estudo selecionado',
    example: 'guia_de_estudo',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Mensagem retornada pelo Gemini',
    example: 'Guia de estudo sobre....',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Disciplina selecionada pelo usuário',
    example: 'Portugues`',
  })
  @IsString()
  discipline: string;
}
