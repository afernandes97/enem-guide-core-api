import { ApiProperty } from '@nestjs/swagger';
import { GeminiResponseDto } from './geminiResponse.dto';

export class StudyGuideResponseDto {
  @ApiProperty({ description: 'Mensagem informativa', example: 'Get gemini' })
  message: string;

  @ApiProperty({ description: 'Dados retornados pelo Gemini' })
  geminiData: GeminiResponseDto;
}
