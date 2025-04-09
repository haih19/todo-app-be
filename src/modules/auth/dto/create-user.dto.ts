import { RegexConstant } from '@/common/constants/regex';
import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';
import { MatchField } from '@/common/decorators/match-field.decorator';
import { errorMessageBuilder } from '@/common/errors/error-message-builder';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john19', required: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: errorMessageBuilder('Username', 'tooShort', { minLength: 6 }),
  })
  @MaxLength(18, { message: errorMessageBuilder('Username', 'tooLong', { maxLength: 18 }) })
  @Matches(RegexConstant.USERNAME, { message: errorMessageBuilder('Username', 'invalid') })
  username?: string;

  @ApiProperty({ example: 'john19@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: errorMessageBuilder('Email', 'invalid') })
  email: string;

  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '********' })
  @IsValidPassword('Password')
  password: string;

  @ApiProperty({ example: '********' })
  @IsValidPassword('Confirm Password')
  @MatchField('password', {
    message: errorMessageBuilder('Confirm Password', 'invalid', {
      customMessage: 'Password does not match.',
    }),
  })
  confirmPassword: string;
}
