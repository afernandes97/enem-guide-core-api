import { Module } from '@nestjs/common';
import { AuthModule } from './Modules/Auth/Modules/auth.module';
import { UserModule } from './Modules/User/Modules/user.module';
import { StudyModule } from './Modules/Study/Modules/study.module';
import { GeminiModule } from './Modules/Gemini/Modules/gemini.module';
import { HistoryModule } from './Modules/UserHistory/Modules/history.module';

@Module({
  imports: [AuthModule, UserModule, StudyModule, GeminiModule, HistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
