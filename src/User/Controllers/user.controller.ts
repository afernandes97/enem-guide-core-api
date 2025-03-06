import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  ConflictException,
} from '@nestjs/common';
import { JwtPassportGuard } from 'src/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Auth/Services/jwt.service';
import { UserService } from '../Services/user.service';
import { CreateUserPreferencesDto } from '../Dto/user.dto';

@Controller('profile')
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @Get()
  @UseGuards(JwtPassportGuard)
  async getMe(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = this.jwtService.getIdFromToken(token as string);
    const user = await this.userService.findById(userId);
    return {
      message: 'Id do usuário autenticado pelo google!',
      user,
    };
  }

  @Get('user-preferences')
  @UseGuards(JwtPassportGuard)
  async getUserPreferences(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = this.jwtService.getIdFromToken(token as string);
    const userPreferences =
      await this.userService.findUserPreferencesById(userId);
    return {
      message: 'Preferencias do usuario',
      userPreferences,
    };
  }

  @Post('user-preferences')
  @UseGuards(JwtPassportGuard)
  async createUserPreferences(
    @Body() data: CreateUserPreferencesDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId: string = this.jwtService.getIdFromToken(token as string);
    const existingPreferences =
      await this.userService.findUserPreferencesById(userId);

    if (existingPreferences) {
      throw new ConflictException('User preferences already exist.');
    }

    const accordanceData = { ...data, userId };

    const newUserPreferences =
      await this.userService.createUserPreferences(accordanceData);
    return {
      message: 'User preferences saved successfully!',
      userPreferences: newUserPreferences,
    };
  }
}
