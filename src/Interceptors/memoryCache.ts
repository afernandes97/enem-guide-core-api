import {
  Injectable,
  ExecutionContext,
  CallHandler,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable, of } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from 'src/Modules/Auth/Services/jwt.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MemoryCacheInterceptor implements NestInterceptor {
  private cache: Cache;

  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {
    this.cache = cacheManager;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token: string = request?.headers?.authorization?.split(' ')[1];
    const { studyOption }: { studyOption: string } = request.params;

    if (!token) return next.handle();

    const userId = this.jwtService.getIdFromToken(token);
    const cacheKey = `study-guide-${userId}-${studyOption}`;

    const cachedResponse = await this.cacheManager.get(cacheKey);
    if (cachedResponse) {
      console.log('Cache hit');
      return of(cachedResponse);
    }

    const response = await firstValueFrom(next.handle());

    try {
      await this.cacheManager.set(cacheKey, response);
    } catch (error) {
      console.error('Error saving cache:', error);
    }

    return of(response);
  }
}
