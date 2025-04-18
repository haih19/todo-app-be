import { errorMessageBuilder } from '@/common/errors/error-message-builder';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PasswordDto } from './password.dto';
import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';
import { IsUsernameOrEmail } from '@/common/decorators/is-username-or-email.decorator';

export class LoginDto {
  @ApiProperty({ example: 'john19@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsUsernameOrEmail('Credential')
  credential: string;

  @ApiProperty({ example: '********' })
  @IsValidPassword('Password')
  password: string;
}
