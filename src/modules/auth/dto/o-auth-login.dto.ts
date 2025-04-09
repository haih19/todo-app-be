import { OAuthProviderEnum } from '@/modules/auth/enums/auth.enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class OAuthLoginDto {
  @ApiProperty({ example: OAuthProviderEnum.Google })
  @IsString()
  @IsNotEmpty()
  @IsEnum(OAuthProviderEnum)
  provider: OAuthProviderEnum;

  @ApiProperty({ example: '***********************' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
