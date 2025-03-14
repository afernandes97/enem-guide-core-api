import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { JwtPassportGuard } from 'src/Modules/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Modules/Auth/Services/jwt.service';
import { UserService } from 'src/Modules/User/Services/user.service';
import { GeminiService } from 'src/Shared/Gemini/gemini.service';
import { UserHistoryService } from 'src/Modules/UserHistory/Services/history.service';
import { CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import { MemoryCacheInterceptor } from 'src/Interceptors/memoryCache';
import { Cache } from 'cache-manager';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { StudyGuideResponseDto } from '../Dto/studyResponse.dto';

@Controller('study')
@UseInterceptors(MemoryCacheInterceptor)
export class StudyController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly geminiService: GeminiService,
    private readonly userHistoryService: UserHistoryService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('guide/:studyOption')
  @UseGuards(JwtPassportGuard)
  @CacheKey('study-cache')
  @ApiParam({ name: 'studyOption', description: 'Opção de estudo escolhida' })
  @ApiResponse({
    status: 200,
    description: 'Guia de estudo gerado',
    type: StudyGuideResponseDto,
  })
  async getChat(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const { studyOption } = req.params;

    const userId = this.jwtService.getIdFromToken(token as string);

    const cacheKey = `study-guide-${userId}-${studyOption}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const userData = await this.userService.findById(userId);
    const userPreferences =
      await this.userService.findUserPreferencesById(userId);

    const geminiMessage = `
      Olá, preciso de um plano de estudos completo personalizado para a matéria de **${studyOption}**, focado na preparação para o ENEM.
      
      ### 📌 **Sobre Mim**
      - Nome: ${userData?.name}
      - Idade: ${userPreferences?.age} anos  
      - Ano escolar: ${userPreferences?.schoolYear}º ano  
      - Nível de confiança nos estudos: ${userPreferences?.academyAvarege} (de 0 a 10)  
      - Tempo disponível para estudo: ${userPreferences?.studyHoursPerDay} horas por dia  
      
      ### 🎯 **Meus Objetivos**
      ${userPreferences?.Objective}
      
      ### 📖 **Facilidade e Dificuldades**
      - **Matéria favorita:** ${userPreferences?.favoriteSubject}  
      - **Dificuldade em:** ${userPreferences?.difficultMaterial}  
      
      Com base nessas informações, poderia elaborar um guia de estudos detalhado para que eu tenha um melhor aproveitamento em **${studyOption}**, levando em consideração minha disponibilidade de tempo e minhas dificuldades?
      Quero um plano completo e eficiente, com sugestões de materiais e métodos de estudo que me ajudem a melhorar meu desempenho. Obrigado! 🙌

      ### **Observações**
      - Se possivel usar uma linguagem mais atual e moderna
      - Pensa ser uma persona Professor, de mais idade, porém com linguajar jovem
      - Seu nome do personagem sera Professor Jeronimo
      - Tenta não ditar horarios, cada pessoa tem uma realidade
      - Se possivel, passar guia de livros
      `;

    const geminiData = await this.geminiService.sendMessage(geminiMessage);

    const historyData = {
      userId,
      type: 'study_guide',
      message: geminiData.message,
      discipline: studyOption,
    };

    await this.userHistoryService.createUserHistory(historyData);

    return {
      message: 'Get gemini',
      geminiData,
    };
  }
}
