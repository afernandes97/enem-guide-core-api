import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/Modules/auth.module';
import { UserModule } from './User/Modules/user.module';
import { StudyModule } from './Study/Modules/study.module';
import { GeminiModule } from './Gemini/Modules/gemini.module';

@Module({
  imports: [AuthModule, UserModule, StudyModule, GeminiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
