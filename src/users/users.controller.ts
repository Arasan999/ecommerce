import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './DTOs/create-user-dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { UpdateUserDto } from './DTOs/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: RequestWithUser) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    async updateProfile(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
        const user = req.user;
        await this.usersService.update(user.id, updateUserDto);
        return this.usersService.findOneBy({ email: user.email });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    async deleteProfile(@Req() req: RequestWithUser) {
        const user = req.user;
        await this.usersService.remove(user.id);
    }
}