import { AppLoggerService } from '@/modules/app-logger/app-logger.service';
import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { UserStatusEnum } from './enums/auth.enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private logger: AppLoggerService
  ) {}

  private async generateRandomUsername(): Promise<string> {
    try {
      let username: string | null = null;
      let isTaken = true;
      let retry = 0;
      const MAX_RETRY = 10;

      while (isTaken && retry < MAX_RETRY) {
        username = 'user_' + Math.random().toString(36).substring(2, 10);
        const existingUser = await this.userRepository.findOne({ where: { username } });

        isTaken = !!existingUser;
        retry++;
      }

      if ((retry === MAX_RETRY && isTaken) || !username) {
        throw new Error('Exceeded maximum attempts to generate unique username.');
      }

      return username;
    } catch (error) {
      throw new Error('Failed to generate a unique username.');
    }
  }

  async validateJwtPayload(payload: { userId: number; email: string }) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      if (user.status !== UserStatusEnum.Active) {
        throw new UnauthorizedException('User is inactive.');
      }

      return user;
    } catch (error) {}
  }

  async register(createUser: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { email, password, firstName, lastName, username } = createUser;

      const existingUser = await this.userRepository.findOne({
        where: [{ email }, { username }],
      });
      if (existingUser) {
        throw new BadGatewayException('Email or Username already in use.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const generatedUsername = await this.generateRandomUsername();

      const newUser = this.userRepository.create({
        email,
        username: generatedUsername,
        password: hashedPassword,
        firstName,
        lastName,
        status: UserStatusEnum.Inactive,
      });

      const savedUser = await this.userRepository.save(newUser);

      return plainToInstance(UserResponseDto, savedUser);
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }
}
