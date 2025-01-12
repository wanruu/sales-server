import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class BaseUserDto {
    @ApiProperty({ example: 1, description: 'Unique identifier of the user.' })
    @IsNumber()
    @Expose()
    id: number;

    @ApiProperty({
        example: 'Hermione',
        description:
            'Username, consisting of at least 5 and at most 35 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @MinLength(5)
    @MaxLength(35)
    @IsString()
    @Expose()
    name: string;

    @ApiProperty({
        example: '12345678',
        description:
            'User password, consisting of at least 8 and at most 255 characters.',
    })
    @MinLength(8)
    @MaxLength(255)
    @IsString()
    @Expose()
    password: string;
}
