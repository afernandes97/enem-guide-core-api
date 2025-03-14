import { Module } from '@nestjs/common';
import { StudyController } from '../Controllers/study.controller';
import { AuthModule } from 'src/Modules/Auth/Modules/auth.module';
import { PrismaModule } from 'src/Repository/Modules/prisma.module';
import { UserService } from 'src/Modules/User/Services/user.service';
import { GeminiService } from 'src/Shared/Gemini/gemini.service';
import { UserHistoryService } from 'src/Modules/UserHistory/Services/history.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [StudyController],
  providers: [UserService, GeminiService, UserHistoryService],
})
export class StudyModule {}
