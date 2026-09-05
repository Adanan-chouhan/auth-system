import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return {
      statusCode: 200,
      message: 'Users fetched successfully',
      data: users,
    };
  }
}
