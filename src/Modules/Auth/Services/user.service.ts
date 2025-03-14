import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Repository/Service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(profile: {
    googleId: string;
    email: string;
    name?: string;
    profileImage?: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { googleId: profile.googleId },
    });

    if (user) return user;

    return this.prisma.user.create({
      data: {
        googleId: profile.googleId,
        email: profile.email,
        name: profile.name,
        profileImage: profile.profileImage,
      },
    });
  }
}
