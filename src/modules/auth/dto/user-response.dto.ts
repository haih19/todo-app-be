import { UserStatusEnum } from '@/modules/auth/enums/auth.enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '123' })
  id: number;

  @ApiProperty({ example: 'john19' })
  username: string;

  @ApiProperty({ example: 'john19@gmail.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'https://picsum.photos/240/240' })
  avatarUrl?: string;

  @ApiProperty({ example: UserStatusEnum.Active })
  status: UserStatusEnum;

  @ApiProperty({ example: '2025-04-09T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-04-09T10:00:00Z' })
  updatedAt: Date;
}
