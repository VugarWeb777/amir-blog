import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsPhoneNumber()
  readonly phone?: string;
}
