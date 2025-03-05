import { Module } from '@nestjs/common';
import { AuthController } from '../Controllers/auth.controller';
import { UsersService } from '../Services/user.service';
import { PrismaService } from 'src/Repository/Service/prisma.service';
import { GoogleStrategy } from '../Strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '../Services/jwt.service';
import { JwtPassportStrategy } from '../Strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    PrismaService,
    GoogleStrategy,
    JwtService,
    JwtPassportStrategy,
  ],
  exports: [JwtService],
})
export class AuthModule {}
