import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDTO } from './auth.dto';
import { AuthService } from './auth.service';

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
  signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {

    return this.authService.signIn(authCredentialsDTO)


  }

}
