import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    private async validateUser(email: string, pass: string) {
        const user = await this.usersService.findOneBy({ email })

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, sub: user.id, role: user.role }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
