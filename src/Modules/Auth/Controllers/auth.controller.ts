import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../Interfaces/jwt.interface';
import { JwtService } from '../Services/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
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
  authFailure(@Res() res: Response) {
    return res.send('Falha ao autenticar!');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {});
    res.redirect('/');
  }
}
