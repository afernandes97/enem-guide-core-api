import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/Modules/auth.module';
import { PrismaModule } from 'src/Repository/Modules/prisma.module';
import { UserService } from 'src/User/Services/user.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [UserService],
})
export class GeminiModule {}
