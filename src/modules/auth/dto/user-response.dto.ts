import { UserStatusEnum } from '@/modules/auth/enums/auth.enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: '123' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'john19' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'john19@gmail.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'https://picsum.photos/240/240' })
  @Expose()
  avatarUrl?: string;

  @ApiProperty({ example: UserStatusEnum.Active })
  @Expose()
  status: UserStatusEnum;

  @ApiProperty({ example: '2025-04-09T10:00:00Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-04-09T10:00:00Z' })
  @Expose()
  updatedAt: Date;
}
