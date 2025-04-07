import { RegexConstant } from '@/common/constants/regex';
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
  @ApiProperty({ example: 'john19' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: errorMessageBuilder('Username', 'tooShort', { minLength: 6 }),
  })
  @MaxLength(18, { message: errorMessageBuilder('Username', 'tooLong', { maxLength: 18 }) })
  @Matches(RegexConstant.USERNAME, { message: errorMessageBuilder('Username', 'invalid') })
  username: string;

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

  @ApiProperty({ example: '*********' })
  @IsNotEmpty()
  @MinLength(8, { message: errorMessageBuilder('Password', 'tooShort', { minLength: 8 }) })
  @MaxLength(20, { message: errorMessageBuilder('Password', 'tooLong', { maxLength: 20 }) })
  @Matches(RegexConstant.PASSWORD, {
    message: errorMessageBuilder('Password', 'invalid', {
      customMessage:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
  })
  password: string;
}
