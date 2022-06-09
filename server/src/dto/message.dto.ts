import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class MessageDto {
    @IsString()
    text: string

    @IsNumber()
    @IsNotEmpty()
    senderId: number

    @IsNumber()
    @IsNotEmpty()
    receivedId: number
}
