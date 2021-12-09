import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number

  @IsString()
  // @IsNotEmpty()
  // @ApiProperty({type: String, description: `Укажите имя пользователя`})
  name: string;


  @IsEmail()
  // @ApiProperty({type: String, description: `Некорректный email`})
  email: string;

  @MinLength(4)
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({type: String, description: `Некорректный пароль`})
  password: string;
}
