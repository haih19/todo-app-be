import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { UserStatusEnum } from './enums/auth.enums';

@Injectable()
export class AuthService {
  private readonly jwtExpiresIn: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.jwtExpiresIn = configService.get<string>('JWT_EXPIRES_IN', '3200s');
  }

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

  async validateUser(credential: string, password: string): Promise<UserResponseDto> {
    try {
      const isEmail = credential.includes('@');

      const filteredUser = await this.userRepository.findOneBy({
        ...(isEmail ? { email: credential } : { username: credential }),
      });

      if (!filteredUser) throw new NotFoundException('Not found username or email.');

      const isPasswordValid = await bcrypt.compare(password, filteredUser.password);

      if (!isPasswordValid) throw new UnauthorizedException('Invalid password.');

      return plainToInstance(UserResponseDto, filteredUser, {
        excludeExtraneousValues: true,
      });
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const generateUsername = username ? username : await this.generateRandomUsername();

      const newUser = this.userRepository.create({
        email,
        username: generateUsername,
        password: hashedPassword,
        firstName,
        lastName,
        status: UserStatusEnum.Inactive,
      });

      const savedUser = await this.userRepository.save(newUser);

      return plainToInstance(UserResponseDto, savedUser, {
        excludeExtraneousValues: true,
      });
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
        accessToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtExpiresIn,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId: number): Promise<UserResponseDto> {
    try {
      const user = this.userRepository.findOne({ where: { id: userId } });

      if (!user) throw new NotFoundException('Not found username or email.');

      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
