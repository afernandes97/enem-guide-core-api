import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtPassportGuard } from 'src/Auth/Guards/auth.guard';
import { Request } from 'express';
import { JwtService } from 'src/Auth/Services/jwt.service';
import { UserService } from '../Services/user.service';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const userId = this.jwtService.getIdFromToken(token as string);
    const user = await this.userService.findById(userId as string);
    return {
      message: 'Id do usuário autenticado pelo google!',
      user,
    };
  }
}
