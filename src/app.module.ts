import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/Modules/auth.module';
import { UserModule } from './User/Modules/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
