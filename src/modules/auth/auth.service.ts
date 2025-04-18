import { AppLoggerService } from '@/modules/app-logger/app-logger.service';
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { UserStatusEnum } from './enums/auth.enums';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private logger: AppLoggerService,
    private jwtService: JwtService
  ) {}

  private async generateRandomUsername(): Promise<string> {
    try {
      const usernames = Array.from(
        { length: 5 },
        () => 'user_' + Math.random().toString(36).substring(2, 10)
      );

      const existingUsers = await this.userRepository.find({
        where: usernames.map((username) => ({ username })),
        select: ['username'],
      });

      const taken = new Set(existingUsers.map((u) => u.username));
      const available = usernames.find((u) => !taken.has(u));

      if (!available) {
        throw new InternalServerErrorException('Failed to generate a unique username.');
      }

      return available;
    } catch (error) {
      throw new InternalServerErrorException('Error while generating username: ' + error.message);
    }
  }

  async validateJwtPayload(payload: { userId: number; email: string }) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      if (user.status !== UserStatusEnum.Active) {
        throw new UnauthorizedException('Your account has been disabled. Please contact support.');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async validateUser(credential: string, password: string) {
    try {
      const isEmail = credential.includes('@');

      const filteredUser = await this.userRepository.findOneBy({
        ...(isEmail ? { email: credential } : { username: credential }),
      });

      if (!filteredUser) throw new NotFoundException('Not found username or email.');

      const isPasswordValid = await bcrypt.compare(password, filteredUser.password);

      if (!isPasswordValid) throw new UnauthorizedException('Invalid password.');

      return filteredUser;
    } catch (error) {
      throw error;
    }
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

      const [hashedPassword, generatedUsername] = await Promise.all([
        bcrypt.hash(password, 10),
        this.generateRandomUsername(),
      ]);

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
      throw error;
    }
  }

  async login(user: UserResponseDto) {
    try {
      const payload = {
        sub: user.id,
        user: user.email,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
