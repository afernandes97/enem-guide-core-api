import { Module } from '@nestjs/common';
import { StudyController } from '../Controllers/study.controller';
import { AuthModule } from 'src/Auth/Modules/auth.module';
import { PrismaModule } from 'src/Repository/Modules/prisma.module';
import { UserService } from 'src/User/Services/user.service';
import { GeminiService } from 'src/Gemini/Services/gemini.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [StudyController],
  providers: [UserService, GeminiService],
})
export class StudyModule {}
