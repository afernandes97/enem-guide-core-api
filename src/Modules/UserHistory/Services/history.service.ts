import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Repository/Service/prisma.service';
import { CreateUserHistoryDto } from '../Dto/history.dto';

@Injectable()
export class UserHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserHistory(data: CreateUserHistoryDto) {
    return this.prisma.userHistory.create({
      data: {
        userId: data.userId || '',
        type: data.type,
        message: data.message,
        discipline: data.discipline,
      },
    });
  }

  async getUserHistory(userId: string) {
    return this.prisma.userHistory.findMany({
      where: { userId: userId },
    });
  }
}
