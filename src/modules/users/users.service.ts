import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password_hash'>> {
    const { email, username, password_hash } = data;

    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('An account with this email already exists.');
    }

    const existingUsername = await this.repository.findByUsername(username);
    if (existingUsername) {
      throw new ConflictException('This username is already taken.');
    }

    const hashedPassword = await this.hashPassword(password_hash);

    const newUser = await this.repository.create({
      ...data,
      password_hash: hashedPassword,
    });

    const { password_hash: _, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findByUsername(username);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findById(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
