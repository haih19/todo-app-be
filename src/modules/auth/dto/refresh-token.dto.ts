import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI...' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty({ required: false })
  @IsString()
  deviceId?: string;
}
