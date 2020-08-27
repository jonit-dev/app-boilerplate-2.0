import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from './auth.decorators';
import { AuthCredentialsDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }


  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    console.log(authCredentialsDTO);

    return this.authService.signUp(authCredentialsDTO)
  }

  @Post("/signin")
  signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {

    return this.authService.signIn(authCredentialsDTO)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User): null {
    console.log(user);
    return null
  }


}
