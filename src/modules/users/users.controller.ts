import { 
  Controller, 
  Get, 
  UseGuards, 
  Request,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user data' })
  async getCurrentUser(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password_hash, ...result } = user;
    return result;
  }
}