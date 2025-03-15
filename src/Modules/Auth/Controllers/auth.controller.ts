import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../Interfaces/jwt.interface';
import { JwtService } from '../Services/jwt.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Inicia a autenticação com o Google' })
  @ApiResponse({
    status: 200,
    description: 'Redireciona para o login do Google.',
  })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback da autenticação do Google' })
  @ApiResponse({
    status: 302,
    description: 'Redireciona para o dashboard com um token JWT.',
  })
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtPayload;
    if (!user) {
      return res.redirect('/auth/failure');
    }
    const jwtPayload = {
      sub: user?.id || '',
      email: user?.email || '',
      name: user.name || '',
      accessToken: user.accessToken || '',
    };
    const jwtToken = this.jwtService.generateToken(jwtPayload);

    return res.redirect(`http://localhost:3000/dashboard?token=${jwtToken}`);
  }

  @Get('failure')
  @ApiOperation({ summary: 'Falha na autenticação' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem indicando falha ao autenticar.',
  })
  authFailure(@Res() res: Response) {
    return res.send('Falha ao autenticar!');
  }

  @Get('logout')
  @ApiOperation({ summary: 'Faz logout do usuário' })
  @ApiResponse({
    status: 302,
    description: 'Redireciona para a página inicial.',
  })
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {});
    res.redirect('/');
  }
}
