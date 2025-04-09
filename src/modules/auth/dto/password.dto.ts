import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';
import { MatchField } from '@/common/decorators/match-field.decorator';
import { errorMessageBuilder } from '@/common/errors/error-message-builder';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty({ example: '*********' })
  @IsValidPassword('Password')
  password: string;
}

export class ConfirmPasswordDto {
  @ApiProperty({ example: '********' })
  @IsValidPassword('Confirm Password')
  @MatchField('password', {
    message: errorMessageBuilder('Confirm Password', 'invalid', {
      customMessage: 'Password does not match.',
    }),
  })
  confirmPassword: string;
}
