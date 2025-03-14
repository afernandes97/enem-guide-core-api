import { ApiProperty } from '@nestjs/swagger';

export class GeminiResponseDto {
  @ApiProperty({
    description: 'Mensagem gerada pelo Gemini',
    example: 'Aqui está seu plano de estudos...',
  })
  message: string;
}
