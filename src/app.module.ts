import { Module } from '@nestjs/common';
import { AuthModule } from './Modules/Auth/Modules/auth.module';
import { UserModule } from './Modules/User/Modules/user.module';
import { StudyModule } from './Modules/Study/Modules/study.module';
import { GeminiModule } from './Modules/Gemini/Modules/gemini.module';
import { HistoryModule } from './Modules/UserHistory/Modules/history.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MemoryCacheInterceptor } from './Interceptors/memoryCache';

@Module({
  imports: [
    AuthModule,
    UserModule,
    StudyModule,
    GeminiModule,
    HistoryModule,
    CacheModule.register({
      ttl: 9000,
      max: 100,
      isGlobal: true,
      store: 'memory',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MemoryCacheInterceptor,
    },
  ],
})
export class AppModule {}
