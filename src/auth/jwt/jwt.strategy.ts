import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "src/users/services/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey', // todo: Change this to an environment variable
        });

    }

    async validate(payload: any) {
        const user = await this.usersService.findOneBy({
            email: payload.email
        })

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}