import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Repository/Service/prisma.service';
import { CreateUserPreferencesDto } from '../Dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findUserPreferencesById(userId: string) {
    return this.prisma.userPreferences.findUnique({
      where: { userId: userId },
    });
  }

  async createUserPreferences(data: CreateUserPreferencesDto) {
    return this.prisma.userPreferences.create({
      data: {
        userId: data.userId || '',
        age: data.age,
        academyAvarege: data.academyAverage,
        selectedLanguage: data.selectedLanguage,
        schoolYear: data.schoolYear,
        Objective: data.objective,
        studyHoursPerDay: data.studyHoursPerDay,
        favoriteSubject: data.favoriteSubject,
        difficultMaterial: data.difficultMaterial,
      },
    });
  }
}
