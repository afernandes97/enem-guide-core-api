import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  ConflictException,
} from '@nestjs/common';
import { JwtPassportGuard } from 'src/Modules/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Modules/Auth/Services/jwt.service';
import { UserService } from '../Services/user.service';
import { CreateUserPreferencesDto } from '../Dto/user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtPassportGuard)
  @ApiOperation({ summary: 'Obtém os dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
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
  @ApiOperation({ summary: 'Obtém as preferências do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Preferências retornadas com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
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
  @ApiOperation({ summary: 'Cria novas preferências para o usuário' })
  @ApiResponse({ status: 201, description: 'Preferências salvas com sucesso.' })
  @ApiResponse({
    status: 409,
    description: 'As preferências do usuário já existem.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
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
