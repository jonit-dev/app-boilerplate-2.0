import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IEnvConfig } from '../../config/config.types';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnvConfig>) => ({
        defaultStrategy: configService.get('authentication.passport.defaultStrategy')
      }),
      inject: [ConfigService]
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnvConfig>) => ({
        secret: configService.get('authentication.jwtSecret'),
        signOptions: {
          expiresIn: 3600,
        }
      }),
      inject: [ConfigService]
    }),
    ConfigService,
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
