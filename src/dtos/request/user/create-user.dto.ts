import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'Hermione',
        description: 'Consists of at least 5 and at most 35 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @MinLength(5)
    @MaxLength(35)
    @IsString()
    name: string;

    @ApiProperty({
        example: '12345678',
        description: 'Consists of at least 8 and at most 255 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @MinLength(8)
    @MaxLength(255)
    @IsString()
    password: string;
}
