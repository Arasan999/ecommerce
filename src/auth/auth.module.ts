import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', //todo: change this to environment variable
      signOptions: {
        expiresIn: '60m'
      }
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule { }
