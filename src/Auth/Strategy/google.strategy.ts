import { Injectable } from '@nestjs/common';
import {
  Profile as GoogleProfile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import { UsersService } from '../Services/user.service';
import { PassportStrategy } from '@nestjs/passport';

interface CustomProfile extends GoogleProfile {
  id: string;
  emails: Array<{ value: string; verified: boolean }>;
  displayName: string;
  photos: Array<{ value: string }>;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    const options: StrategyOptions = {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: false,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: CustomProfile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, emails, displayName, photos } = profile;

      const user = await this.usersService.findOrCreateUser({
        googleId: id,
        email: emails[0].value,
        name: displayName,
        profileImage: photos[0]?.value,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      done(null, user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      done(error, false);
    }
  }
}
