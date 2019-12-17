import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  signIn(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
