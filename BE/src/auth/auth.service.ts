import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    return this.userRepository.register(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(loginDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
}
