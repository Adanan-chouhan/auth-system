import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<Partial<User>> {
    const normalizedEmail = registerDto.email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email address already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Create and save user
    const newUser = this.userRepository.create({
      fullName: registerDto.fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    // Omit password from returned user object
    const { password, ...result } = savedUser;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async updatePassword(email: string, newPassword: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await this.userRepository.save(user);
    return true;
  }
  async findAll(): Promise<Partial<User>[]> {
  const users = await this.userRepository.find({
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });

  return users;
}
}

