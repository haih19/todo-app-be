import { RegexConstant } from '@/common/constants/regex';
import { errorMessageBuilder } from '@/common/errors/error-message-builder';
import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export function IsValidPassword(label = 'Password') {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    MinLength(8, { message: errorMessageBuilder(label, 'tooShort', { minLength: 8 }) }),
    MaxLength(20, { message: errorMessageBuilder(label, 'tooLong', { maxLength: 20 }) }),
    Matches(RegexConstant.PASSWORD, {
      message: errorMessageBuilder(label, 'invalid', {
        customMessage:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }),
    })
  );
}
