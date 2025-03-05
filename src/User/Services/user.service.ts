import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Repository/Service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
