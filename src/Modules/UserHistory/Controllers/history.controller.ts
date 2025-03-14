import { Controller, UseGuards, Req, Post, Body, Get } from '@nestjs/common';
import { JwtPassportGuard } from 'src/Modules/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Modules/Auth/Services/jwt.service';
import { CreateUserHistoryDto } from '../Dto/history.dto';
import { UserHistoryService } from '../Services/history.service';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userHistoryService: UserHistoryService,
  ) {}

  @Post('user')
  @UseGuards(JwtPassportGuard)
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
