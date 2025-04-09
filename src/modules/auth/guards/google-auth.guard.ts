import { OAuthProviderEnum } from '@/modules/auth/enums/auth.enums';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(OAuthProviderEnum.Google) {}
