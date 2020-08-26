import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';




export class AuthCredentialsDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)

  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: "Your chosen password is too weak."
  // })  // Regex to force strong password
  password: string;
}