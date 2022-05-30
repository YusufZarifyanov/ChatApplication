import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string

    @ApiProperty()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isActive: boolean

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string
}
