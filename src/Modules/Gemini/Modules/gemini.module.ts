import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Modules/Auth/Modules/auth.module';
import { PrismaModule } from 'src/Repository/Modules/prisma.module';
import { UserService } from 'src/Modules/User/Services/user.service';
import { GeminiService } from 'src/Shared/Gemini/gemini.service';

@Module({
  imports: [AuthModule, PrismaModule],
  exports: [GeminiService],
  providers: [UserService, GeminiService],
})
export class GeminiModule {}
