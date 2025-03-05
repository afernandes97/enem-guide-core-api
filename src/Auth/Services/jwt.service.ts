import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from '../Interfaces/jwt.interface';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateToken(payload: JwtPayload): string {
    return this.nestJwtService.sign(payload, { expiresIn: '1h' });
  }

  verifyToken(token: string): void | null {
    try {
      this.nestJwtService.verify(token, {
        secret: process.env.APP_JWT_SECRET_KEY,
      });
      return;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }

  getIdFromToken(token: string): string | null {
    try {
      const decoded: JwtPayload = this.nestJwtService.decode(token);
      return decoded.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
