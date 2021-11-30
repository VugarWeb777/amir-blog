import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  readonly firstName?: string;

  @IsString()
  readonly lastName?: string;

  @IsString()
  readonly patronymic?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNumber()
  readonly state?: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isVerified: boolean;
}
