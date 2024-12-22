import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'Hermione' })
    @IsString()
    name: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty()
    accessToken: string;
}
