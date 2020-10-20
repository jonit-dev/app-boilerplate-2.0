import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { IAuthGranted } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<IAuthGranted> {
    return this.authService.signIn(authCredentialsDTO);
  }

  // protected route sample
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // // test(@Req() req): { status: string, payload: any } {
  // test(@GetUser() user: User): { status: string, payload: any } {

  //   console.log(user);

  //   return {
  //     status: "protected route!",
  //     payload: user
  //   }
  // }
}
