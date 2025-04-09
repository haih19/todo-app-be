import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuthProviderEnum } from '../enums/auth.enums';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const googleClientId = configService.get<string>('GOOGLE_CLIENT_ID', 'DEFAULT');
    const googleClientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET', 'DEFAULT');
    const callbackUrl = configService.get<string>('GOOGLE_CALLBACK_URL', 'DEFAULT');

    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: callbackUrl,
      scope: ['profile', 'email'],
    });
  }
  async validate(...args: any[]) {}
}
