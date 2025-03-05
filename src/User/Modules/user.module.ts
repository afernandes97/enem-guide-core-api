import { Module } from '@nestjs/common';
import { UserController } from '../Controllers/user.controller';
import { AuthModule } from 'src/Auth/Modules/auth.module';
import { UserService } from '../Services/user.service';
import { PrismaModule } from 'src/Repository/Modules/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
