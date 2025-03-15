import { Controller, UseGuards, Req, Post, Body, Get } from '@nestjs/common';
import { JwtPassportGuard } from 'src/Modules/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Modules/Auth/Services/jwt.service';
import { CreateUserHistoryDto } from '../Dto/history.dto';
import { UserHistoryService } from '../Services/history.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('History')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userHistoryService: UserHistoryService,
  ) {}

  @Post('user')
  @UseGuards(JwtPassportGuard)
  @ApiOperation({ summary: 'Cria um novo histórico para o usuário' })
  @ApiResponse({ status: 201, description: 'Histórico salvo com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async createUserHistory(
    @Body() data: CreateUserHistoryDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId: string = this.jwtService.getIdFromToken(token as string);
    const accordanceData = { ...data, userId };

    const newUserPreferences =
      await this.userHistoryService.createUserHistory(accordanceData);
    return {
      message: 'User preferences saved successfully!',
      userPreferences: newUserPreferences,
    };
  }

  @Get('user')
  @UseGuards(JwtPassportGuard)
  @ApiOperation({ summary: 'Obtém o histórico do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Histórico do usuário retornado com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async getUserHistory(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId: string = this.jwtService.getIdFromToken(token as string);

    const userHistoryData =
      await this.userHistoryService.getUserHistory(userId);
    return {
      message: 'User History!',
      userHistoryData: userHistoryData,
    };
  }
}
