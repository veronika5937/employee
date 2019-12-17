import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password, name } = registerDto;

    const user = new User();
    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') { // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
