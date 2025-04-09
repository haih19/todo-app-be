import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';
import { MatchField } from '@/common/decorators/match-field.decorator';
import { errorMessageBuilder } from '@/common/errors/error-message-builder';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: '********' })
  @IsValidPassword('Current Password')
  currentPassword: string;

  @ApiProperty({ example: '********' })
  @IsValidPassword('New Password')
  newPassword: string;

  @ApiProperty({ example: '********' })
  @IsValidPassword('Confirm Password')
  @MatchField('newPassword', {
    message: errorMessageBuilder('Confirm Password', 'invalid', {
      customMessage: 'Password does not match.',
    }),
  })
  confirmPassword: string;
}
